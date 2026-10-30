// HTML escape function to prevent XSS in email bodies
export function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Template for notification email sent to portfolio owner (Hemant).
 * Reply-To header is set to the visitor so clicking "Reply" answers them directly.
 */
export function getOwnerEmailTemplate({ name, email, subject, message, ip, timestamp }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const rawSubject = typeof subject === "string" ? subject.replace(/[\r\n]+/g, " ").trim() : "";
  const displaySubject = rawSubject || "New Inquiry";
  const safeSubject = escapeHtml(displaySubject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const safeIp = escapeHtml(ip || "unknown");
  const safeDate = escapeHtml(timestamp || new Date().toISOString());

  const textBody = [
    `New message from your portfolio contact form:`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Subject: ${displaySubject}`,
    `Date:    ${timestamp || new Date().toISOString()}`,
    `IP:      ${ip || "unknown"}`,
    ``,
    `Message:`,
    `--------------------------------------------------`,
    message,
    `--------------------------------------------------`,
    ``,
    `Note: You can reply directly to this email to respond to ${name} (${email}).`,
  ].join("\r\n");

  const htmlBody = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5ff; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.08); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #7c3aed 0%, #4338ca 100%); padding: 24px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 700;">New Portfolio Inquiry</h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">From ${safeName} &lt;${safeEmail}&gt;</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; width: 80px; font-weight: 600;">Subject:</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${safeSubject}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">From:</td>
          <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${safeEmail}" style="color: #7c3aed; text-decoration: none;">${safeName} (${safeEmail})</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Received:</td>
          <td style="padding: 6px 0; color: #64748b; font-size: 12px;">${safeDate} (IP: ${safeIp})</td>
        </tr>
      </table>

      <div style="margin-top: 16px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
        <h3 style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #7c3aed;">Message:</h3>
        <div style="background: #f8fafc; border-left: 4px solid #7c3aed; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #1e293b;">
          ${safeMessage}
        </div>
      </div>

      <div style="margin-top: 24px; padding: 12px 16px; background: #ede9fe; border-radius: 8px; font-size: 12px; color: #5b21b6;">
        💡 <strong>Quick Reply:</strong> Clicking "Reply" in your email client will reply directly to <strong>${safeEmail}</strong>.
      </div>
    </div>
  </div>
</body>
</html>`;

  return {
    subject: `[Portfolio] ${displaySubject} - from ${name}`,
    replyTo: email,
    text: textBody,
    html: htmlBody,
  };
}

/**
 * Template for thank-you auto-reply sent to the visitor.
 */
export function getVisitorAutoReplyTemplate({ name }) {
  const safeName = escapeHtml(name);

  const textBody = [
    `Hi ${name},`,
    ``,
    `Thank you for reaching out through my portfolio website!`,
    `I have received your message and will review it and get back to you shortly.`,
    ``,
    `Best regards,`,
    `Hemant Kushwaha`,
    `MERN Full Stack Developer`,
    `Email: kushwahhemant766@gmail.com`,
    `GitHub: https://github.com/Hemantkumar468`,
    `LinkedIn: https://www.linkedin.com/in/hemant-kushwaha-dev`,
  ].join("\r\n");

  const htmlBody = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Contacting Hemant Kushwaha</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5ff; color: #0f172a;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.08); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #7c3aed 0%, #0284c7 100%); padding: 24px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 700;">Message Received!</h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Hemant Kushwaha • MERN Full Stack Developer</p>
    </div>
    
    <div style="padding: 24px; line-height: 1.6; font-size: 14px; color: #334155;">
      <p style="margin-top: 0;">Hi <strong>${safeName}</strong>,</p>
      
      <p>Thank you for getting in touch! I have successfully received your inquiry and will review your note and respond as soon as possible.</p>
      
      <p>In the meantime, feel free to explore my source code on <a href="https://github.com/Hemantkumar468" style="color: #7c3aed; font-weight: 600; text-decoration: none;">GitHub</a> or connect with me on <a href="https://www.linkedin.com/in/hemant-kushwaha-dev" style="color: #7c3aed; font-weight: 600; text-decoration: none;">LinkedIn</a>.</p>
      
      <div style="margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 13px; color: #64748b;">
        <p style="margin: 0; font-weight: 700; color: #0f172a;">Hemant Kushwaha</p>
        <p style="margin: 2px 0 0 0;">MERN Full Stack Developer</p>
        <p style="margin: 2px 0 0 0;">Jhansi & Bhopal, India</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  return {
    subject: `Thank you for contacting Hemant Kushwaha`,
    text: textBody,
    html: htmlBody,
  };
}

