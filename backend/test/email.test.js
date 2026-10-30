import test, { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { FakeSmtpServer } from "./fake-smtp.js";
import {
  sendMail,
  verifyMailer,
  sanitizeHeader,
  validateEmail,
  encodeSubject,
  SmtpSession,
} from "../mailer.js";
import { getOwnerEmailTemplate, getVisitorAutoReplyTemplate } from "../templates.js";
import app, { clearRateLimits } from "../index.js";
import config from "../config.js";

describe("Hemant Kushwaha Portfolio - Complete SMTP & Contact Test Suite", () => {
  // Helper to start Express app on ephemeral port
  function startHttpServer() {
    return new Promise((resolve) => {
      const server = app.listen(0, "127.0.0.1", () => {
        const port = server.address().port;
        resolve({
          server,
          port,
          baseUrl: `http://127.0.0.1:${port}`,
          close: () => new Promise((res) => server.close(res)),
        });
      });
    });
  }

  // ============================================================================
  // Test 1: MIME correctness
  // ============================================================================
  it("Test 1: MIME correctness - multipart/alternative, RFC 2047 subject, base64 parts, Reply-To", async () => {
    const smtp = new FakeSmtpServer({ mode: "implicit_tls" });
    const port = await smtp.start();

    try {
      const visitorEmail = "visitor@domain.com";
      const subject = "Portfolio Inquiry from Visitor";
      const text = "Hello Hemant, this is plain text.";
      const html = "<p>Hello Hemant, this is <strong>HTML</strong>.</p>";

      await sendMail(
        {
          from: "mailer@hemant.dev",
          to: "owner@hemant.dev",
          replyTo: visitorEmail,
          subject,
          text,
          html,
        },
        {
          host: "127.0.0.1",
          port,
          secure: true,
          user: "testuser",
          pass: "correctpass",
          rejectUnauthorized: false,
        }
      );

      assert.equal(smtp.receivedEmails.length, 1);
      const email = smtp.receivedEmails[0];
      assert.equal(email.mailFrom, "mailer@hemant.dev");
      assert.equal(email.rcptTo, "owner@hemant.dev");

      const body = email.body;
      assert.ok(body.includes(`Reply-To: <${visitorEmail}>`), "Reply-To header must match visitor");
      assert.ok(body.includes("Subject: =?UTF-8?B?"), "Subject must be RFC 2047 encoded");
      assert.ok(
        body.includes('Content-Type: multipart/alternative; boundary="'),
        "Content-Type must be multipart/alternative"
      );
      assert.ok(
        body.includes("Content-Type: text/plain; charset=UTF-8"),
        "Must include text/plain part"
      );
      assert.ok(
        body.includes("Content-Type: text/html; charset=UTF-8"),
        "Must include text/html part"
      );

      // Verify base64 content decode
      const plainMatch = body.match(
        /Content-Type: text\/plain; charset=UTF-8\r?\nContent-Transfer-Encoding: base64\r?\n\r?\n([\s\S]+?)\r?\n--/
      );
      assert.ok(plainMatch, "Plain text part must be base64");
      const decodedPlain = Buffer.from(plainMatch[1].replace(/\r?\n/g, ""), "base64").toString(
        "utf-8"
      );
      assert.equal(decodedPlain, text);

      const htmlMatch = body.match(
        /Content-Type: text\/html; charset=UTF-8\r?\nContent-Transfer-Encoding: base64\r?\n\r?\n([\s\S]+?)\r?\n--/
      );
      assert.ok(htmlMatch, "HTML part must be base64");
      const decodedHtml = Buffer.from(htmlMatch[1].replace(/\r?\n/g, ""), "base64").toString(
        "utf-8"
      );
      assert.equal(decodedHtml, html);
    } finally {
      await smtp.close();
    }
  });

  // ============================================================================
  // Test 2: Transport — implicit TLS (port 465)
  // ============================================================================
  it("Test 2: Transport - implicit TLS connects, authenticates, sends, and quits cleanly", async () => {
    const smtp = new FakeSmtpServer({ mode: "implicit_tls" });
    const port = await smtp.start();

    try {
      const res = await sendMail(
        {
          from: "me@hemant.dev",
          to: "friend@example.com",
          subject: "Implicit TLS Check",
          text: "Testing implicit TLS",
        },
        {
          host: "127.0.0.1",
          port,
          secure: true,
          user: "testuser",
          pass: "correctpass",
          rejectUnauthorized: false,
        }
      );

      assert.equal(res.ok, true);
      assert.equal(smtp.receivedEmails.length, 1);
      assert.equal(smtp.receivedEmails[0].rcptTo, "friend@example.com");
    } finally {
      await smtp.close();
    }
  });

  // ============================================================================
  // Test 3: Transport — STARTTLS (port 587)
  // ============================================================================
  it("Test 3: Transport - STARTTLS upgrades socket; AUTH is NEVER sent before TLS", async () => {
    const smtp = new FakeSmtpServer({ mode: "starttls" });
    const port = await smtp.start();

    try {
      const res = await sendMail(
        {
          from: "starttls@hemant.dev",
          to: "destination@example.com",
          subject: "STARTTLS Verification",
          text: "Verifying STARTTLS sequence",
        },
        {
          host: "127.0.0.1",
          port,
          secure: false, // Plain first, then STARTTLS
          user: "testuser",
          pass: "correctpass",
          rejectUnauthorized: false,
        }
      );

      assert.equal(res.ok, true);
      assert.equal(smtp.receivedEmails.length, 1);
      // Hard assertion: AUTH was NEVER attempted before TLS was active
      assert.equal(
        smtp.authAttemptedBeforeTls,
        false,
        "Credentials must NEVER be sent over plaintext before STARTTLS upgrade!"
      );
    } finally {
      await smtp.close();
    }
  });

  // ============================================================================
  // Test 4: Auth failure
  // ============================================================================
  it("Test 4: Auth failure - wrong password triggers 535 and bubbles code up", async () => {
    const smtp = new FakeSmtpServer({ mode: "implicit_tls" });
    const port = await smtp.start();

    try {
      await assert.rejects(
        async () => {
          await sendMail(
            {
              from: "me@hemant.dev",
              to: "someone@example.com",
              subject: "Auth Fail",
              text: "Should fail",
            },
            {
              host: "127.0.0.1",
              port,
              secure: true,
              user: "testuser",
              pass: "WRONG_PASSWORD_XYZ",
              rejectUnauthorized: false,
            }
          );
        },
        (err) => {
          assert.equal(err.code, 535, "Error code must be 535");
          assert.ok(err.message.includes("535"), "Error message must mention 535");
          return true;
        }
      );
    } finally {
      await smtp.close();
    }
  });

  // ============================================================================
  // Test 5: Security — untrusted certificate rejected
  // ============================================================================
  it("Test 5: Security - untrusted certificate is rejected with rejectUnauthorized: true", async () => {
    const smtp = new FakeSmtpServer({ mode: "implicit_tls" });
    const port = await smtp.start();

    try {
      await assert.rejects(
        async () => {
          await sendMail(
            {
              from: "me@hemant.dev",
              to: "someone@example.com",
              subject: "Untrusted Cert",
              text: "Should fail due to self-signed cert",
            },
            {
              host: "127.0.0.1",
              port,
              secure: true,
              user: "testuser",
              pass: "correctpass",
              rejectUnauthorized: true, // Default strict mode
            }
          );
        },
        (err) => {
          assert.ok(
            err.code === "DEPTH_ZERO_SELF_SIGNED_CERT" ||
              err.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE" ||
              err.message.includes("self-signed") ||
              err.message.includes("certificate"),
            `Expected cert rejection error, got: ${err.message} (${err.code})`
          );
          return true;
        }
      );
    } finally {
      await smtp.close();
    }
  });

  // ============================================================================
  // Test 6: Security — refusing credentials over plain unencrypted connection
  // ============================================================================
  it("Test 6: Security - refusing to send credentials over plain unencrypted connection", async () => {
    const session = new SmtpSession({
      user: "testuser",
      pass: "secretpassword",
    });

    // Mock an unencrypted socket
    session.socket = {
      encrypted: false,
      destroyed: false,
      write: () => {},
    };

    await assert.rejects(
      async () => {
        await session.authenticate();
      },
      {
        message: "Refusing to send credentials over an unencrypted connection",
      }
    );
  });

  // ============================================================================
  // Test 7: Security — header injection neutralized
  // ============================================================================
  it("Test 7: Security - header injection attempts (CR/LF) are sanitized and stripped", () => {
    const dirtyHeader = "Hemant Kushwaha\r\nBcc: evil@attacker.com\r\nContent-Type: text/html";
    const cleaned = sanitizeHeader(dirtyHeader);

    assert.equal(cleaned.includes("\r"), false, "Must not contain CR");
    assert.equal(cleaned.includes("\n"), false, "Must not contain LF");
    assert.equal(
      cleaned,
      "Hemant Kushwaha Bcc: evil@attacker.com Content-Type: text/html"
    );

    // Validate email rejects injection
    const dirtyEmail = "test@example.com\r\nBcc: evil@attacker.com";
    assert.equal(validateEmail(dirtyEmail), false, "Injected email string must be rejected");
  });

  // ============================================================================
  // Test 8: UTF-8 & Hindi round-trip test
  // ============================================================================
  it("Test 8: UTF-8 & Hindi test - Name, Subject, and Body round-trip without mojibake", async () => {
    const smtp = new FakeSmtpServer({ mode: "implicit_tls" });
    const port = await smtp.start();

    try {
      const hindiName = "हेमंत कुशवाहा";
      const hindiSubject = "नमस्ते — Portfolio Test";
      const hindiMessage = "यह एक परीक्षण संदेश है।";

      // Test RFC 2047 encoding and decoding
      const encodedSubj = encodeSubject(hindiSubject);
      assert.ok(encodedSubj.startsWith("=?UTF-8?B?"));
      const b64 = encodedSubj.replace(/^=\?UTF-8\?B\?/, "").replace(/\?=$/, "");
      const decodedSubj = Buffer.from(b64, "base64").toString("utf-8");
      assert.equal(decodedSubj, hindiSubject);

      // Full mail round-trip
      await sendMail(
        {
          from: "kushwahhemant766@gmail.com",
          to: "kushwahhemant766@gmail.com",
          replyTo: "visitor@example.com",
          subject: hindiSubject,
          text: `नाम: ${hindiName}\nसंदेश: ${hindiMessage}`,
          html: `<p>नाम: ${hindiName}</p><p>संदेश: ${hindiMessage}</p>`,
        },
        {
          host: "127.0.0.1",
          port,
          secure: true,
          user: "testuser",
          pass: "correctpass",
          rejectUnauthorized: false,
        }
      );

      assert.equal(smtp.receivedEmails.length, 1);
      const email = smtp.receivedEmails[0];

      // Decode base64 body parts
      const plainMatch = email.body.match(
        /Content-Type: text\/plain; charset=UTF-8\r?\nContent-Transfer-Encoding: base64\r?\n\r?\n([\s\S]+?)\r?\n--/
      );
      const decodedPlain = Buffer.from(plainMatch[1].replace(/\r?\n/g, ""), "base64").toString(
        "utf-8"
      );
      assert.ok(decodedPlain.includes(hindiName));
      assert.ok(decodedPlain.includes(hindiMessage));
    } finally {
      await smtp.close();
    }
  });

  // ============================================================================
  // Test 9: Express POST /api/contact full flow (Owner + Visitor Auto-Reply)
  // ============================================================================
  it("Test 9: Express POST /api/contact full flow - returns 201 and delivers TWO emails", async () => {
    const smtp = new FakeSmtpServer({
      mode: "implicit_tls",
      expectedUser: "testuser@gmail.com",
      expectedPass: "correctpass",
    });
    const smtpPort = await smtp.start();
    const httpApp = await startHttpServer();

    // Configure env vars
    const prevHost = process.env.SMTP_HOST;
    const prevPort = process.env.SMTP_PORT;
    const prevUser = process.env.SMTP_USER;
    const prevPass = process.env.SMTP_PASS;
    const prevMailFrom = process.env.MAIL_FROM;
    const prevMailTo = process.env.MAIL_TO;
    const prevReject = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    const prevAuto = process.env.AUTO_REPLY;
    const prevSecure = process.env.SMTP_SECURE;

    process.env.SMTP_HOST = "127.0.0.1";
    process.env.SMTP_PORT = String(smtpPort);
    process.env.SMTP_USER = "testuser@gmail.com";
    process.env.SMTP_PASS = "correctpass";
    process.env.MAIL_FROM = "testuser@gmail.com";
    process.env.MAIL_TO = "owner@test.com";
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    process.env.AUTO_REPLY = "true";
    process.env.SMTP_SECURE = "true";

    clearRateLimits();

    try {
      const payload = {
        name: "Jane Visitor",
        email: "jane@example.com",
        subject: "Freelance Project Opportunity",
        message: "Hello Hemant, I would love to hire you for a MERN stack ERP project.",
      };

      const response = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.status !== 201) {
        console.error("DEBUG TEST 9 ERROR:", response.status, data);
      }
      assert.equal(response.status, 201);
      assert.equal(data.ok, true);
      assert.equal(data.success, true);
      assert.ok(data.message.includes("successfully"));

      // Assert TWO emails received
      assert.equal(
        smtp.receivedEmails.length,
        2,
        "Expected exactly 2 emails (owner notification + visitor auto-reply)"
      );

      // 1. Owner Email
      const ownerMail = smtp.receivedEmails[0];
      assert.equal(ownerMail.rcptTo, config.MAIL_TO);
      assert.ok(ownerMail.body.includes("Reply-To: <jane@example.com>"));
      
      const ownerPlainMatch = ownerMail.body.match(
        /Content-Type: text\/plain; charset=UTF-8\r?\nContent-Transfer-Encoding: base64\r?\n\r?\n([\s\S]+?)\r?\n--/
      );
      assert.ok(ownerPlainMatch, "Owner email must have base64 text part");
      const decodedOwnerPlain = Buffer.from(
        ownerPlainMatch[1].replace(/\r?\n/g, ""),
        "base64"
      ).toString("utf-8");
      assert.ok(decodedOwnerPlain.includes("Freelance Project Opportunity"));

      // 2. Visitor Auto-Reply
      const visitorMail = smtp.receivedEmails[1];
      assert.equal(visitorMail.rcptTo, "jane@example.com");
      
      const visitorPlainMatch = visitorMail.body.match(
        /Content-Type: text\/plain; charset=UTF-8\r?\nContent-Transfer-Encoding: base64\r?\n\r?\n([\s\S]+?)\r?\n--/
      );
      assert.ok(visitorPlainMatch, "Visitor email must have base64 text part");
      const decodedVisitorPlain = Buffer.from(
        visitorPlainMatch[1].replace(/\r?\n/g, ""),
        "base64"
      ).toString("utf-8");
      assert.ok(
        decodedVisitorPlain.includes("reaching out through my portfolio website"),
        "Visitor auto-reply should include thank-you text"
      );
    } finally {
      process.env.SMTP_HOST = prevHost;
      process.env.SMTP_PORT = prevPort;
      process.env.SMTP_USER = prevUser;
      process.env.SMTP_PASS = prevPass;
      process.env.MAIL_FROM = prevMailFrom;
      process.env.MAIL_TO = prevMailTo;
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = prevReject;
      process.env.AUTO_REPLY = prevAuto;
      if (prevSecure !== undefined) {
        process.env.SMTP_SECURE = prevSecure;
      } else {
        delete process.env.SMTP_SECURE;
      }

      await httpApp.close();
      await smtp.close();
    }
  });

  // ============================================================================
  // Test 10: Validation Matrix
  // ============================================================================
  it("Test 10: Validation matrix - empty fields, invalid email, lengths, bad JSON, 413, honeypot, 404, rate limit", async () => {
    const httpApp = await startHttpServer();
    clearRateLimits();

    try {
      // 1. Empty / too short name -> 400
      let res = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "A", email: "valid@email.com", message: "1234567890" }),
      });
      assert.equal(res.status, 400);

      // 2. Invalid email -> 400
      res = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Valid Name", email: "not-an-email", message: "1234567890" }),
      });
      assert.equal(res.status, 400);

      // 3. Message < 10 chars -> 400
      res = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Valid Name", email: "valid@email.com", message: "short" }),
      });
      assert.equal(res.status, 400);

      // 4. Message > 2000 chars -> 400
      res = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Valid Name",
          email: "valid@email.com",
          message: "a".repeat(2001),
        }),
      });
      assert.equal(res.status, 400);

      // 5. Malformed JSON -> 400
      res = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{ broken json syntax ...",
      });
      assert.equal(res.status, 400);

      // 6. Payload > 50kb -> 413
      const largePayload = {
        name: "Test",
        email: "test@example.com",
        message: "x".repeat(60 * 1024),
      };
      res = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(largePayload),
      });
      assert.equal(res.status, 413);

      // 7. Honeypot filled -> 201 without emailing
      res = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Bot User",
          email: "bot@spammer.com",
          message: "This is spam content.",
          website: "http://spamsite.xyz",
        }),
      });
      assert.equal(res.status, 201);

      // 8. Unknown route -> 404
      res = await fetch(`${httpApp.baseUrl}/api/non-existent-endpoint`);
      assert.equal(res.status, 404);

      // 9. Rate limiting -> 5 allowed, 6th returns 429 + Retry-After
      clearRateLimits();
      const validBody = JSON.stringify({
        name: "Rate Tester",
        email: "ratetest@example.com",
        message: "Testing in-memory rate limiter window.",
        website: "skip-mail", // using honeypot so we don't need active SMTP for rate limit test
      });

      for (let i = 0; i < 5; i++) {
        const r = await fetch(`${httpApp.baseUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: validBody,
        });
        assert.equal(r.status, 201, `Request #${i + 1} must pass rate limit`);
      }

      // 6th request must trigger 429
      const rateLimitedRes = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: validBody,
      });
      assert.equal(rateLimitedRes.status, 429);
      assert.ok(
        rateLimitedRes.headers.get("retry-after"),
        "429 response must contain Retry-After header"
      );
    } finally {
      await httpApp.close();
    }
  });

  // ============================================================================
  // Test 11: Error handling — SMTP down returns 502 with honest message
  // ============================================================================
  it("Test 11: Error handling - when SMTP is down, returns 502/503 with honest error, NEVER 201", async () => {
    const httpApp = await startHttpServer();
    clearRateLimits();

    const prevHost = process.env.SMTP_HOST;
    const prevPort = process.env.SMTP_PORT;
    const prevUser = process.env.SMTP_USER;
    const prevPass = process.env.SMTP_PASS;

    // Point SMTP to a closed port on localhost
    process.env.SMTP_HOST = "127.0.0.1";
    process.env.SMTP_PORT = "9999";
    process.env.SMTP_USER = "testuser";
    process.env.SMTP_PASS = "testpass";

    try {
      const response = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Real Visitor",
          email: "visitor@example.com",
          message: "Will this fail gracefully when SMTP is offline?",
        }),
      });

      const body = await response.json();
      assert.ok(
        response.status === 502 || response.status === 503,
        `Expected 502 or 503, got ${response.status}`
      );
      assert.equal(body.ok, false);
      assert.equal(body.success, false);
      assert.ok(
        body.message.includes("failed") || body.message.includes("Unavailable"),
        "Response must state honest error failure"
      );
    } finally {
      process.env.SMTP_HOST = prevHost;
      process.env.SMTP_PORT = prevPort;
      process.env.SMTP_USER = prevUser;
      process.env.SMTP_PASS = prevPass;
      await httpApp.close();
    }
  });

  // ============================================================================
  // Test 12: Neither SMTP nor MongoDB available returns 503
  // ============================================================================
  it("Test 12: Returns 503 when neither SMTP nor MongoDB is available", async () => {
    const httpApp = await startHttpServer();
    clearRateLimits();

    const prevUser = process.env.SMTP_USER;
    const prevPass = process.env.SMTP_PASS;

    // Unconfigure SMTP
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;

    try {
      const response = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "No Service Visitor",
          email: "noservice@example.com",
          message: "Checking complete offline state behavior.",
        }),
      });

      const body = await response.json();
      assert.equal(response.status, 503);
      assert.equal(body.ok, false);
      assert.ok(body.message.includes("Service Unavailable"));
    } finally {
      process.env.SMTP_USER = prevUser;
      process.env.SMTP_PASS = prevPass;
      await httpApp.close();
    }
  });

  // ============================================================================
  // Test 13: Optional subject field validation and template formatting
  // ============================================================================
  it("Test 13: Optional subject field validation (max 150, newlines stripped) and template formatting", async () => {
    const httpApp = await startHttpServer();
    clearRateLimits();

    try {
      // 1. Subject > 150 chars -> 400
      let res = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          subject: "s".repeat(151),
          message: "Valid test message for subject test.",
        }),
      });
      assert.equal(res.status, 400);
      const data1 = await res.json();
      assert.ok(data1.message.includes("150 characters"));

      // 2. Non-string subject -> 400
      res = await fetch(`${httpApp.baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          subject: 12345,
          message: "Valid test message for subject test.",
        }),
      });
      assert.equal(res.status, 400);

      // 3. Subject template output formatting: [Portfolio] <subject> - from <name>
      const templateWithSubject = getOwnerEmailTemplate({
        name: "Hemant Client",
        email: "client@example.com",
        subject: "Contract Opportunity\r\nFull Stack",
        message: "We want to hire you.",
      });
      assert.equal(
        templateWithSubject.subject,
        "[Portfolio] Contract Opportunity Full Stack - from Hemant Client",
        "Newlines must be stripped from subject line"
      );

      // 4. Default when subject is omitted
      const templateNoSubject = getOwnerEmailTemplate({
        name: "Anonymous Client",
        email: "anon@example.com",
        message: "Checking default subject.",
      });
      assert.equal(
        templateNoSubject.subject,
        "[Portfolio] New Inquiry - from Anonymous Client",
        "Default subject should be used when omitted"
      );
    } finally {
      await httpApp.close();
    }
  });
});
