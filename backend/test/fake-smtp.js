import net from "node:net";
import tls from "node:tls";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultCert = fs.readFileSync(path.join(__dirname, "cert.pem"));
const defaultKey = fs.readFileSync(path.join(__dirname, "key.pem"));

/**
 * In-process Mock SMTP Server for testing RFC 5321, STARTTLS, Implicit TLS,
 * AUTH LOGIN / PLAIN, UTF-8 MIME delivery, and security constraints.
 */
export class FakeSmtpServer {
  constructor(options = {}) {
    this.mode = options.mode || "implicit_tls"; // "implicit_tls" | "starttls" | "plain"
    this.expectedUser = options.expectedUser || "testuser";
    this.expectedPass = options.expectedPass || "correctpass";
    this.cert = options.cert || defaultCert;
    this.key = options.key || defaultKey;

    this.server = null;
    this.port = 0;
    this.sockets = new Set();
    this.receivedEmails = [];
    this.authAttemptedBeforeTls = false;
  }

  async start() {
    return new Promise((resolve, reject) => {
      const connectionHandler = (socket) => {
        this.sockets.add(socket);
        socket.on("close", () => this.sockets.delete(socket));

        let isEncrypted = this.mode === "implicit_tls";
        let state = "COMMAND";
        let currentAuthUser = null;
        let currentMailFrom = null;
        let currentRcptTo = null;
        let dataLines = [];
        let buffer = "";

        const writeLine = (activeSocket, text) => {
          if (!activeSocket.destroyed) {
            activeSocket.write(text + "\r\n");
          }
        };

        const handleCommandLine = (activeSocket, line) => {
          const upper = line.toUpperCase().trim();

          if (state === "AUTH_LOGIN_USER") {
            try {
              currentAuthUser = Buffer.from(line.trim(), "base64").toString("utf-8");
            } catch {
              currentAuthUser = line.trim();
            }
            state = "AUTH_LOGIN_PASS";
            return writeLine(activeSocket, "334 UGFzc3dvcmQ6");
          }

          if (state === "AUTH_LOGIN_PASS") {
            let pass = "";
            try {
              pass = Buffer.from(line.trim(), "base64").toString("utf-8");
            } catch {
              pass = line.trim();
            }
            state = "COMMAND";
            if (currentAuthUser === this.expectedUser && pass === this.expectedPass) {
              return writeLine(activeSocket, "235 2.7.0 Authentication successful");
            } else {
              return writeLine(activeSocket, "535 5.7.8 Authentication credentials invalid");
            }
          }

          if (state === "AUTH_PLAIN_WAIT") {
            state = "COMMAND";
            try {
              const decoded = Buffer.from(line.trim(), "base64").toString("utf-8");
              const parts = decoded.split("\0");
              const user = parts.length > 2 ? parts[1] : parts[0];
              const pass = parts.length > 2 ? parts[2] : parts[1];
              if (user === this.expectedUser && pass === this.expectedPass) {
                return writeLine(activeSocket, "235 2.7.0 Authentication successful");
              }
            } catch {}
            return writeLine(activeSocket, "535 5.7.8 Authentication credentials invalid");
          }

          // Check if AUTH is attempted before encryption
          if (upper.startsWith("AUTH")) {
            if (!isEncrypted) {
              this.authAttemptedBeforeTls = true;
            }

            if (upper.startsWith("AUTH LOGIN")) {
              state = "AUTH_LOGIN_USER";
              return writeLine(activeSocket, "334 VXNlcm5hbWU6");
            }

            if (upper.startsWith("AUTH PLAIN")) {
              const arg = line.slice(10).trim();
              if (arg) {
                try {
                  const decoded = Buffer.from(arg, "base64").toString("utf-8");
                  const parts = decoded.split("\0");
                  const user = parts.length > 2 ? parts[1] : parts[0];
                  const pass = parts.length > 2 ? parts[2] : parts[1];
                  if (user === this.expectedUser && pass === this.expectedPass) {
                    return writeLine(activeSocket, "235 2.7.0 Authentication successful");
                  }
                } catch {}
                return writeLine(activeSocket, "535 5.7.8 Authentication credentials invalid");
              } else {
                state = "AUTH_PLAIN_WAIT";
                return writeLine(activeSocket, "334 ");
              }
            }

            return writeLine(activeSocket, "504 5.5.4 Unrecognized auth mechanism");
          }

          if (upper.startsWith("EHLO") || upper.startsWith("HELO")) {
            if (this.mode === "starttls" && !isEncrypted) {
              writeLine(activeSocket, "250-localhost Hello");
              writeLine(activeSocket, "250-STARTTLS");
              return writeLine(activeSocket, "250 HELP");
            } else {
              writeLine(activeSocket, "250-localhost Hello");
              writeLine(activeSocket, "250-AUTH LOGIN PLAIN");
              return writeLine(activeSocket, "250 HELP");
            }
          }

          if (upper === "STARTTLS") {
            if (this.mode === "starttls" && !isEncrypted) {
              writeLine(activeSocket, "220 2.0.0 Ready to start TLS");

              // Remove listeners from plain socket
              activeSocket.removeAllListeners("data");

              // Upgrade to TLS Socket
              const secureSocket = new tls.TLSSocket(activeSocket, {
                isServer: true,
                cert: this.cert,
                key: this.key,
              });

              this.sockets.add(secureSocket);
              isEncrypted = true;
              bindSocket(secureSocket);
              return;
            } else {
              return writeLine(activeSocket, "503 5.5.1 Not supported or already TLS");
            }
          }

          if (upper.startsWith("MAIL FROM:")) {
            currentMailFrom = line.slice(10).trim().replace(/[<>]/g, "");
            return writeLine(activeSocket, "250 2.1.0 Ok");
          }

          if (upper.startsWith("RCPT TO:")) {
            currentRcptTo = line.slice(8).trim().replace(/[<>]/g, "");
            return writeLine(activeSocket, "250 2.1.5 Ok");
          }

          if (upper === "DATA") {
            state = "DATA";
            dataLines = [];
            return writeLine(activeSocket, "354 End data with <CR><LF>.<CR><LF>");
          }

          if (upper === "RSET") {
            currentMailFrom = null;
            currentRcptTo = null;
            dataLines = [];
            state = "COMMAND";
            return writeLine(activeSocket, "250 2.0.0 Reset OK");
          }

          if (upper === "NOOP") {
            return writeLine(activeSocket, "250 2.0.0 OK");
          }

          if (upper === "QUIT") {
            writeLine(activeSocket, "221 2.0.0 Bye");
            return activeSocket.end();
          }

          writeLine(activeSocket, `502 5.5.2 Command unrecognized: ${line}`);
        };

        const bindSocket = (targetSocket) => {
          targetSocket.on("data", (chunk) => {
            buffer += chunk.toString("utf-8");

            while (true) {
              if (state === "DATA") {
                const dotIndex = buffer.indexOf("\r\n.\r\n");
                const altDotIndex = buffer.indexOf("\n.\n");
                const endPos = dotIndex !== -1 ? dotIndex : altDotIndex;

                if (endPos !== -1) {
                  const body = buffer.slice(0, endPos);
                  buffer = buffer.slice(endPos + (dotIndex !== -1 ? 5 : 3));
                  state = "COMMAND";

                  this.receivedEmails.push({
                    mailFrom: currentMailFrom,
                    rcptTo: currentRcptTo,
                    body: body,
                  });

                  writeLine(targetSocket, "250 2.0.0 Ok: queued as 12345");
                } else {
                  break;
                }
              } else {
                const newlineIndex = buffer.indexOf("\n");
                if (newlineIndex === -1) break;

                const rawLine = buffer.slice(0, newlineIndex);
                buffer = buffer.slice(newlineIndex + 1);
                const line = rawLine.replace(/\r$/, "");
                if (line.length === 0 && state === "COMMAND") continue;

                handleCommandLine(targetSocket, line);
              }
            }
          });

          targetSocket.on("error", () => {});
        };

        // Greet client immediately upon connection
        writeLine(socket, "220 localhost ESMTP FakeServer Ready");
        bindSocket(socket);
      };

      if (this.mode === "implicit_tls") {
        this.server = tls.createServer(
          {
            cert: this.cert,
            key: this.key,
          },
          connectionHandler
        );
      } else {
        this.server = net.createServer(connectionHandler);
      }

      this.server.on("error", reject);

      this.server.listen(0, "127.0.0.1", () => {
        this.port = this.server.address().port;
        resolve(this.port);
      });
    });
  }

  async close() {
    return new Promise((resolve) => {
      for (const socket of this.sockets) {
        try {
          socket.destroy();
        } catch {}
      }
      this.sockets.clear();

      if (this.server) {
        this.server.close(() => resolve());
      } else {
        resolve();
      }
    });
  }
}

export default FakeSmtpServer;

