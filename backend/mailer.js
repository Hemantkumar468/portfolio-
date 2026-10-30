import net from "node:net";
import tls from "node:tls";
import crypto from "node:crypto";
import config from "./config.js";

// Strip CR and LF to defend against SMTP header injection
export function sanitizeHeader(val) {
  if (typeof val !== "string") return "";
  return val.replace(/[\r\n]+/g, " ").trim();
}

// Validate email address format and length (RFC 5321 / RFC 5322 max 254)
export function validateEmail(email) {
  if (typeof email !== "string") return false;
  const clean = sanitizeHeader(email);
  if (clean.length === 0 || clean.length > 254) return false;
  // Standard compliant email regex preventing injection
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
    clean
  );
}

// RFC 2047 Base64 encoded UTF-8 subject line (preserves Hindi and any Unicode)
export function encodeSubject(subject) {
  const clean = sanitizeHeader(subject);
  const b64 = Buffer.from(clean, "utf-8").toString("base64");
  return `=?UTF-8?B?${b64}?=`;
}

// Wrap base64 string to 76 characters per line according to MIME specification
function wrapBase64(str) {
  return str.match(/.{1,76}/g)?.join("\r\n") || str;
}

/**
 * Low-level SMTP client session wrapper
 */
export class SmtpSession {
  constructor(options = {}) {
    this.host = options.host || config.SMTP_HOST || "smtp.gmail.com";
    this.port = parseInt(options.port !== undefined ? options.port : config.SMTP_PORT, 10);
    this.user = options.user !== undefined ? options.user : config.SMTP_USER;
    this.pass = (options.pass !== undefined ? options.pass : config.SMTP_PASS).replace(/\s+/g, "");
    this.secure =
      options.secure !== undefined
        ? options.secure
        : (config.SMTP_SECURE !== undefined ? config.SMTP_SECURE : this.port === 465);
    this.rejectUnauthorized =
      options.rejectUnauthorized !== undefined
        ? options.rejectUnauthorized
        : config.REJECT_UNAUTHORIZED !== false;
    this.timeout = options.timeout || 15000;
    this.socket = null;
    this.buffer = "";
    this.capabilities = [];
  }

  async readResponse() {
    return new Promise((resolve, reject) => {
      let timer = null;
      if (this.timeout) {
        timer = setTimeout(() => {
          cleanup();
          reject(new Error("SMTP connection timed out"));
        }, this.timeout);
      }

      const cleanup = () => {
        if (timer) clearTimeout(timer);
        if (this.socket) {
          this.socket.removeListener("data", onData);
          this.socket.removeListener("error", onError);
          this.socket.removeListener("close", onClose);
        }
      };

      const onError = (err) => {
        cleanup();
        reject(err);
      };

      const onClose = (hadError) => {
        cleanup();
        if (hadError) {
          reject(new Error("SMTP connection closed prematurely with error"));
        } else {
          reject(new Error("SMTP connection closed by server"));
        }
      };

      const checkLines = () => {
        const parts = this.buffer.split(/\r?\n/);
        // Find if there is a complete multi-line or single-line response
        let fullResponse = [];
        let completedCode = null;

        for (let i = 0; i < parts.length - 1; i++) {
          const line = parts[i];
          fullResponse.push(line);
          const match = line.match(/^(\d{3})([ -])(.*)$/);
          if (match) {
            const [, code, sep] = match;
            if (sep === " " || sep === "") {
              completedCode = parseInt(code, 10);
              // Consume lines from buffer up to line i
              const consumedCount = parts.slice(0, i + 1).join("\n").length + 1;
              this.buffer = this.buffer.slice(consumedCount);
              cleanup();
              return resolve({ code: completedCode, lines: fullResponse, raw: fullResponse.join("\r\n") });
            }
          }
        }
      };

      const onData = (chunk) => {
        this.buffer += chunk.toString("utf-8");
        checkLines();
      };

      if (!this.socket) {
        cleanup();
        return reject(new Error("Socket not initialized"));
      }

      this.socket.on("data", onData);
      this.socket.on("error", onError);
      this.socket.on("close", onClose);

      // Check if response is already in buffer
      checkLines();
    });
  }

  async sendCommand(cmd, expectedCode = 250) {
    if (!this.socket || this.socket.destroyed) {
      throw new Error("SMTP socket is not connected");
    }

    if (cmd !== null) {
      this.socket.write(cmd + "\r\n");
    }

    const res = await this.readResponse();
    const expected = Array.isArray(expectedCode) ? expectedCode : [expectedCode];
    if (!expected.includes(res.code)) {
      const errLine = res.lines[res.lines.length - 1] || res.raw;
      const err = new Error(`SMTP ${res.code} Error: ${errLine}`);
      err.code = res.code;
      throw err;
    }
    return res;
  }

  async connect() {
    const isImplicitTls = this.secure;

    if (isImplicitTls) {
      // Direct implicit TLS (e.g. Port 465)
      await new Promise((resolve, reject) => {
        const socket = tls.connect(
          {
            host: this.host,
            port: this.port,
            rejectUnauthorized: this.rejectUnauthorized,
            timeout: this.timeout,
          },
          () => resolve()
        );

        socket.on("error", reject);
        this.socket = socket;
      });

      // Read initial server banner (220)
      const banner = await this.readResponse();
      if (banner.code !== 220) {
        throw new Error(`SMTP ${banner.code} Invalid greeting: ${banner.raw}`);
      }

      await this.negotiateEhlo();
    } else {
      // Plain TCP first, then STARTTLS upgrade (e.g. Port 587)
      await new Promise((resolve, reject) => {
        const socket = net.connect(
          {
            host: this.host,
            port: this.port,
          },
          () => resolve()
        );

        socket.on("error", reject);
        this.socket = socket;
      });

      // Read initial banner (220)
      const banner = await this.readResponse();
      if (banner.code !== 220) {
        throw new Error(`SMTP ${banner.code} Invalid greeting: ${banner.raw}`);
      }

      // First EHLO before STARTTLS
      await this.negotiateEhlo();

      // Issue STARTTLS
      await this.sendCommand("STARTTLS", 220);

      // Upgrade socket to TLS
      await new Promise((resolve, reject) => {
        const plainSocket = this.socket;
        const secureSocket = tls.connect(
          {
            socket: plainSocket,
            host: this.host,
            rejectUnauthorized: this.rejectUnauthorized,
          },
          () => resolve()
        );

        secureSocket.on("error", reject);
        this.socket = secureSocket;
      });

      // Re-issue EHLO over secure connection
      await this.negotiateEhlo();
    }
  }

  async negotiateEhlo() {
    const res = await this.sendCommand("EHLO localhost", 250);
    this.capabilities = res.lines.map((l) => l.slice(4).trim());
  }

  async authenticate() {
    if (!this.user || !this.pass) {
      // No credentials provided
      return;
    }

    // Integrity constraint: Never send credentials over an unencrypted connection!
    const isEncrypted = Boolean(this.socket && this.socket.encrypted);
    if (!isEncrypted) {
      throw new Error("Refusing to send credentials over an unencrypted connection");
    }

    // Check supported auth mechanism in EHLO capabilities or try AUTH LOGIN
    const authLine = this.capabilities.find((c) => c.toUpperCase().startsWith("AUTH "));
    const authMethods = authLine ? authLine.toUpperCase() : "AUTH LOGIN PLAIN";

    if (authMethods.includes("LOGIN")) {
      // AUTH LOGIN
      await this.sendCommand("AUTH LOGIN", 334);
      const b64User = Buffer.from(this.user, "utf-8").toString("base64");
      await this.sendCommand(b64User, 334);
      const b64Pass = Buffer.from(this.pass, "utf-8").toString("base64");
      await this.sendCommand(b64Pass, 235);
    } else if (authMethods.includes("PLAIN")) {
      // AUTH PLAIN
      const token = Buffer.from(`\0${this.user}\0${this.pass}`, "utf-8").toString("base64");
      await this.sendCommand(`AUTH PLAIN ${token}`, 235);
    } else {
      // Default to AUTH LOGIN
      await this.sendCommand("AUTH LOGIN", 334);
      const b64User = Buffer.from(this.user, "utf-8").toString("base64");
      await this.sendCommand(b64User, 334);
      const b64Pass = Buffer.from(this.pass, "utf-8").toString("base64");
      await this.sendCommand(b64Pass, 235);
    }
  }

  async sendMailData({ from, to, replyTo, subject, text, html }) {
    const cleanFrom = sanitizeHeader(from);
    const cleanTo = sanitizeHeader(to);
    const cleanReplyTo = replyTo ? sanitizeHeader(replyTo) : null;

    if (!validateEmail(cleanFrom)) {
      throw new Error(`Invalid sender address: ${cleanFrom}`);
    }
    if (!validateEmail(cleanTo)) {
      throw new Error(`Invalid recipient address: ${cleanTo}`);
    }
    if (cleanReplyTo && !validateEmail(cleanReplyTo)) {
      throw new Error(`Invalid Reply-To address: ${cleanReplyTo}`);
    }

    // SMTP envelope commands
    await this.sendCommand(`MAIL FROM:<${cleanFrom}>`, 250);
    await this.sendCommand(`RCPT TO:<${cleanTo}>`, [250, 251]);
    await this.sendCommand("DATA", 354);

    // Build MIME multipart/alternative payload
    const boundary = `----=_Part_${Date.now()}_${crypto.randomBytes(8).toString("hex")}`;
    const encSubject = encodeSubject(subject || "No Subject");
    const dateStr = new Date().toUTCString();
    const msgId = `<${Date.now()}.${crypto.randomBytes(4).toString("hex")}@${this.host}>`;

    const headers = [
      `From: <${cleanFrom}>`,
      `To: <${cleanTo}>`,
      cleanReplyTo ? `Reply-To: <${cleanReplyTo}>` : null,
      `Subject: ${encSubject}`,
      `Date: ${dateStr}`,
      `Message-ID: ${msgId}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ]
      .filter(Boolean)
      .join("\r\n");

    const plainTextPart = [
      `--${boundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      `Content-Transfer-Encoding: base64`,
      ``,
      wrapBase64(Buffer.from(text || "", "utf-8").toString("base64")),
    ].join("\r\n");

    const htmlPart = [
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: base64`,
      ``,
      wrapBase64(Buffer.from(html || text || "", "utf-8").toString("base64")),
    ].join("\r\n");

    const fullMimeMessage = `${headers}\r\n\r\n${plainTextPart}\r\n\r\n${htmlPart}\r\n\r\n--${boundary}--\r\n.\r\n`;

    // Send DATA payload
    this.socket.write(fullMimeMessage);
    const res = await this.readResponse();
    if (res.code !== 250) {
      throw new Error(`SMTP ${res.code} Error during DATA: ${res.raw}`);
    }

    return { ok: true, messageId: msgId };
  }

  async quit() {
    try {
      if (this.socket && !this.socket.destroyed) {
        await this.sendCommand("QUIT", 221);
      }
    } catch {
      // Ignore errors on QUIT
    } finally {
      if (this.socket) {
        this.socket.destroy();
      }
    }
  }
}

/**
 * Send an email using custom SMTP client
 */
export async function sendMail(
  { from, to, replyTo, subject, text, html },
  customConfig = {}
) {
  const session = new SmtpSession(customConfig);
  try {
    await session.connect();
    await session.authenticate();
    const result = await session.sendMailData({
      from: from || config.MAIL_FROM,
      to,
      replyTo,
      subject,
      text,
      html,
    });
    await session.quit();
    return result;
  } catch (err) {
    await session.quit();
    throw err;
  }
}

/**
 * Verify SMTP connection and credentials
 */
export async function verifyMailer(customConfig = {}) {
  const session = new SmtpSession(customConfig);
  try {
    await session.connect();
    await session.authenticate();
    await session.quit();
    return { ok: true, host: session.host, port: session.port };
  } catch (err) {
    await session.quit();
    throw err;
  }
}

export default {
  sendMail,
  verifyMailer,
  sanitizeHeader,
  validateEmail,
  encodeSubject,
};
