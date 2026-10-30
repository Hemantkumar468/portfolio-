import config from "./config.js"; // MUST be the first import!
import express from "express";
import mongoose from "mongoose";
import { pathToFileURL } from "node:url";
import Contact from "./models/Contact.js";
import { sendMail, verifyMailer, validateEmail } from "./mailer.js";
import { getOwnerEmailTemplate, getVisitorAutoReplyTemplate } from "./templates.js";

const app = express();

// 1. JSON Body Parser with explicit payload limit
app.use(express.json({ limit: "50kb" }));

// 2. Manual CORS using CLIENT_ORIGIN allow-list (supports comma-separated list)
const parseAllowedOrigins = (originSetting) => {
  if (!originSetting) return ["http://localhost:5173", "http://localhost:4173"];
  return originSetting.split(",").map((s) => s.trim()).filter(Boolean);
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = parseAllowedOrigins(config.CLIENT_ORIGIN);

  if (origin && (allowedOrigins.includes(origin) || allowedOrigins.includes("*"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

// 3. In-Memory Rate Limiter for Contact Submissions (5 per 15 min per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

export const contactRateLimiter = (req, res, next) => {
  const clientIp =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "127.0.0.1";
  const now = Date.now();

  const record = rateLimitMap.get(clientIp);

  if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, startTime: now });
    return next();
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSec = Math.ceil(
      (record.startTime + RATE_LIMIT_WINDOW_MS - now) / 1000
    );
    res.setHeader("Retry-After", retryAfterSec);
    return res.status(429).json({
      ok: false,
      success: false,
      message: `Too many submissions from this IP. Please try again after ${Math.ceil(
        retryAfterSec / 60
      )} minutes.`,
    });
  }

  record.count += 1;
  next();
};

export function clearRateLimits() {
  rateLimitMap.clear();
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000).unref();

// 4. State & Connection Management
let isMongoConnected = false;
let smtpStatus = config.isSmtpConfigured() ? "pending" : "not_configured";

mongoose.connection.on("connected", () => {
  isMongoConnected = true;
  console.log("MongoDB connection established.");
});

mongoose.connection.on("disconnected", () => {
  isMongoConnected = false;
});

mongoose.connection.on("error", (err) => {
  isMongoConnected = false;
  console.error("MongoDB connection error:", err.message);
});

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (err) {
    console.warn(
      `MongoDB connection note: ${err.message}. Backend will run with fallback mode if MongoDB is offline.`
    );
  }
}

export function getSmtpHint(err) {
  const msg = err?.message || String(err || "");
  const code = err?.code || 0;

  if (code === 525 || msg.includes("525") || msg.includes("Unauthorized IP")) {
    return "Brevo Authorised IPs blocked this connection. In Brevo, go to Security > Authorised IPs and either deactivate IP blocking or add this machine's public IP.";
  }
  if (
    code === 535 ||
    msg.includes("535") ||
    msg.includes("Authentication credentials invalid") ||
    msg.includes("Bad credentials")
  ) {
    return "SMTP authentication failed (535). Verify your Brevo Login (xxxx@smtp-brevo.com) and Brevo SMTP Key (must be an SMTP key from SMTP & API, not an API key). For Gmail, verify your 16-character App Password.";
  }
  if (
    msg.includes("sender not valid") ||
    msg.includes("Sender address rejected") ||
    msg.includes("unverified") ||
    (code >= 550 && code <= 559)
  ) {
    return "Sender address rejected. Ensure MAIL_FROM matches a verified sender in your email provider (e.g. Brevo > Senders & IPs).";
  }
  if (
    code === "ECONNREFUSED" ||
    msg.includes("ECONNREFUSED") ||
    code === "ETIMEDOUT" ||
    msg.includes("ETIMEDOUT") ||
    msg.includes("timeout")
  ) {
    return "Network connection to SMTP server timed out or was refused. Check if port 587 is blocked by firewall/ISP; try SMTP_PORT=2525 or SMTP_PORT=465 (with SMTP_SECURE=true).";
  }
  return "Please check your SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS settings in .env.";
}

export async function checkSmtp() {
  if (!config.isSmtpConfigured()) {
    smtpStatus = "not_configured";
    console.warn(
      "[WARN] SMTP is not configured. Email delivery will be unavailable. Please set SMTP_USER and SMTP_PASS in .env."
    );
    return false;
  }

  try {
    const res = await verifyMailer();
    smtpStatus = "ok";
    console.log(
      `SMTP OK: Successfully connected and authenticated with ${res.host}:${res.port} as ${config.SMTP_USER}.`
    );
    return true;
  } catch (err) {
    smtpStatus = "error";
    const hint = getSmtpHint(err);
    console.error(`SMTP CHECK FAILED: ${err.message}. Hint: ${hint}`);
    return false;
  }
}

// 5. Routes

// GET /api/health
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Hemant Kushwaha Portfolio API",
    timestamp: new Date().toISOString(),
    database: isMongoConnected ? "connected" : "disconnected",
    smtp: smtpStatus,
  });
});

// GET /api
app.get("/api", (req, res) => {
  res.json({
    name: "Hemant Kushwaha Portfolio API",
    endpoints: {
      health: "GET /api/health",
      contact: "POST /api/contact",
    },
  });
});

// POST /api/contact
app.post("/api/contact", contactRateLimiter, async (req, res, next) => {
  try {
    const { name, email, subject, message, website } = req.body || {};

    // 1. Honeypot check: spambots fill out hidden "website" field
    if (website && typeof website === "string" && website.trim().length > 0) {
      console.log(`[Honeypot Triggered] Spambot detected from IP: ${req.ip || "unknown"}`);
      // Return 201 without sending emails or crashing
      return res.status(201).json({
        ok: true,
        success: true,
        message: "Thank you! Your message has been received.",
      });
    }

    // 2. Strict Input Validation
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 80) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "Name must be between 2 and 80 characters.",
      });
    }

    if (typeof email !== "string" || email.trim().length > 254 || !validateEmail(email.trim())) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "A valid email address (up to 254 characters) is required.",
      });
    }

    if (typeof message !== "string" || message.trim().length < 10 || message.trim().length > 2000) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "Message must be between 10 and 2000 characters.",
      });
    }

    if (subject !== undefined) {
      if (typeof subject !== "string") {
        return res.status(400).json({
          ok: false,
          success: false,
          message: "Subject must be a string.",
        });
      }
      if (subject.trim().length > 150) {
        return res.status(400).json({
          ok: false,
          success: false,
          message: "Subject must be 150 characters or fewer.",
        });
      }
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = typeof subject === "string" ? subject.replace(/[\r\n]+/g, " ").trim() : "Portfolio Inquiry";
    const cleanMessage = message.trim();
    const clientIp =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";

    // 3. Check if neither SMTP nor MongoDB is available -> 503
    const isSmtpReady = config.isSmtpConfigured();
    if (!isMongoConnected && !isSmtpReady) {
      return res.status(503).json({
        ok: false,
        success: false,
        message: "Service Unavailable: Neither database storage nor email delivery is currently available.",
      });
    }

    // 4. Save to MongoDB first if connected (never lose a message)
    let contactDoc = null;
    if (isMongoConnected) {
      try {
        contactDoc = await Contact.create({
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
          ip: String(clientIp),
          emailStatus: "pending",
        });
      } catch (dbErr) {
        console.error("Database save error:", dbErr.message);
      }
    }

    // 5. Send Email to Owner (MAIL_TO)
    if (isSmtpReady) {
      try {
        const ownerEmailData = getOwnerEmailTemplate({
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
          ip: String(clientIp),
          timestamp: new Date().toISOString(),
        });

        await sendMail({
          from: config.MAIL_FROM,
          to: config.MAIL_TO,
          replyTo: cleanEmail,
          subject: ownerEmailData.subject,
          text: ownerEmailData.text,
          html: ownerEmailData.html,
        });

        console.log(`Owner email sent (${cleanEmail} -> ${config.MAIL_TO})`);

        // Mark as sent in DB
        if (contactDoc) {
          contactDoc.emailStatus = "sent";
          await contactDoc.save().catch(() => {});
        }
      } catch (mailErr) {
        const hint = getSmtpHint(mailErr);
        console.error(`Failed to deliver email to owner: ${mailErr.message}. Hint: ${hint}`);

        // Record failure in DB
        if (contactDoc) {
          contactDoc.emailStatus = "failed";
          contactDoc.emailError = mailErr.message;
          await contactDoc.save().catch(() => {});
        }

        const clientMessage = `Email delivery to portfolio owner failed (${mailErr.message}). ${hint}`;

        // Return honest 502 error if DB is alive, or 503 if both failed
        if (!isMongoConnected) {
          return res.status(503).json({
            ok: false,
            success: false,
            message: `Service Unavailable: ${clientMessage} (Database is offline)`,
          });
        }

        return res.status(502).json({
          ok: false,
          success: false,
          message: clientMessage,
        });
      }

      // 6. Best-effort auto-reply to the visitor
      if (config.AUTO_REPLY) {
        try {
          const autoReplyData = getVisitorAutoReplyTemplate({
            name: cleanName,
            message: cleanMessage,
          });

          await sendMail({
            from: config.MAIL_FROM,
            to: cleanEmail,
            subject: autoReplyData.subject,
            text: autoReplyData.text,
            html: autoReplyData.html,
          });
        } catch (autoReplyErr) {
          // Failure of auto-reply must NEVER fail the request
          console.warn("Notice: Visitor auto-reply could not be delivered:", autoReplyErr.message);
        }
      }
    } else {
      // SMTP not configured, but DB was connected
      if (contactDoc) {
        contactDoc.emailStatus = "skipped";
        contactDoc.emailError = "SMTP not configured";
        await contactDoc.save().catch(() => {});
      }

      return res.status(502).json({
        ok: false,
        success: false,
        message: "Email delivery failed: SMTP is not configured on this server.",
      });
    }

    // 7. Success 201 Response
    return res.status(201).json({
      ok: true,
      success: true,
      message: "Thank you! Your message has been sent successfully.",
      data: contactDoc
        ? {
            id: contactDoc._id,
            createdAt: contactDoc.createdAt,
          }
        : undefined,
    });
  } catch (error) {
    next(error);
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found.`,
  });
});

// Central Error Handler (handles body parser errors, 413, 400 bad JSON)
app.use((err, req, res, next) => {
  // Check for body-parser payload limit error
  if (err.type === "entity.too.large" || err.status === 413) {
    return res.status(413).json({
      ok: false,
      success: false,
      message: "Payload too large. Maximum allowed size is 50kb.",
    });
  }

  // Check for malformed JSON syntax error
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      ok: false,
      success: false,
      message: "Invalid JSON format in request body.",
    });
  }

  console.error("Unhandled Server Error:", err);
  res.status(err.status || 500).json({
    ok: false,
    success: false,
    message: err.message || "Internal server error occurred.",
  });
});

// Standalone server boot
const isMain = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (isMain) {
  connectDB();
  checkSmtp();
  app.listen(config.PORT, () => {
    console.log(`Backend server active on http://localhost:${config.PORT}`);
  });
}

export default app;
