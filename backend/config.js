import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tiny dependency-free .env loader
// Real environment variables in process.env ALWAYS take precedence over the file
function loadEnv() {
  const envPath = path.resolve(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, "utf-8");
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        const eqIdx = trimmed.indexOf("=");
        if (eqIdx === -1) continue;

        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();

        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }

        // Real environment variables take precedence
        if (process.env[key] === undefined) {
          process.env[key] = val;
        }
      }
    } catch (err) {
      console.warn("Notice: Could not load .env file:", err.message);
    }
  }

  // Gmail 16-char App Passwords often contain spaces (e.g., 'abcd efgh ijkl mnop')
  // Strip all whitespace from SMTP_PASS so it matches Gmail requirements
  if (process.env.SMTP_PASS) {
    process.env.SMTP_PASS = process.env.SMTP_PASS.replace(/\s+/g, "");
  }
}

loadEnv();

export const config = {
  get PORT() {
    return parseInt(process.env.PORT || "5000", 10);
  },
  get CLIENT_ORIGIN() {
    return process.env.CLIENT_ORIGIN || "http://localhost:5173,http://localhost:4173";
  },
  get MONGO_URI() {
    return process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";
  },
  get SMTP_HOST() {
    return process.env.SMTP_HOST || "smtp.gmail.com";
  },
  get SMTP_PORT() {
    return parseInt(process.env.SMTP_PORT || "465", 10);
  },
  get SMTP_SECURE() {
    if (process.env.SMTP_SECURE !== undefined) {
      return process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1";
    }
    return this.SMTP_PORT === 465;
  },
  get SMTP_USER() {
    return process.env.SMTP_USER || "";
  },
  get SMTP_PASS() {
    return (process.env.SMTP_PASS || "").replace(/\s+/g, "");
  },
  get MAIL_TO() {
    return process.env.MAIL_TO || "kushwahhemant766@gmail.com";
  },
  get MAIL_FROM() {
    return process.env.MAIL_FROM || process.env.SMTP_USER || "kushwahhemant766@gmail.com";
  },
  get AUTO_REPLY() {
    return (
      process.env.AUTO_REPLY !== "false" &&
      process.env.AUTO_REPLY !== "0" &&
      process.env.AUTO_REPLY !== ""
    );
  },
  get REJECT_UNAUTHORIZED() {
    return process.env.NODE_TLS_REJECT_UNAUTHORIZED !== "0";
  },
  isSmtpConfigured() {
    return Boolean(this.SMTP_USER && this.SMTP_PASS);
  },
};

export default config;
