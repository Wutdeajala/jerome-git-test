const { Resend } = require("resend");

const resend      = new Resend(process.env.RESEND_API_KEY);
const SENDER      = process.env.SENDER_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const COMPANY     = "Bima Shelter Ltd";

// ─── Shared base template ──────────────────────────────────────────────────────
const base = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${COMPANY}</title>
</head>
<body style="margin:0;padding:0;background:#f4f2ee;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ee;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#ffffff;border-radius:12px;overflow:hidden;
                    box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">
        <tr>
          <td style="background:#0b2e22;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;
                      color:#b8962e;font-weight:600;">Premium Real Estate</p>
            <h1 style="margin:8px 0 0;font-size:26px;color:#ffffff;font-weight:600;
                       letter-spacing:0.5px;">${COMPANY}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 32px;">${content}</td>
        </tr>
        <tr>
          <td style="background:#f9f8f5;padding:24px 40px;text-align:center;
                     border-top:1px solid #ede9e0;">
            <p style="margin:0;font-size:12px;color:#999;line-height:1.6;">
              ${COMPANY} · Abuja, Nigeria<br/>
              This email was sent in response to a message submitted via our website.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const row = (label, value) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0ede8;width:120px;vertical-align:top;">
      <span style="font-size:11px;font-weight:600;letter-spacing:1px;
                   text-transform:uppercase;color:#aaa;">${label}</span>
    </td>
    <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f0ede8;vertical-align:top;">
      <span style="font-size:14px;color:#222;line-height:1.6;">${value}</span>
    </td>
  </tr>`;

// ─── Admin notification ────────────────────────────────────────────────────────
const adminHTML = ({ name, email, phone, subject, message }) =>
  base(`
    <h2 style="margin:0 0 6px;font-size:20px;color:#0b2e22;font-weight:600;">
      New Website Message
    </h2>
    <p style="margin:0 0 28px;font-size:13px;color:#888;">
      Submitted via the Contact page
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row("Name",    name)}
      ${row("Email",   `<a href="mailto:${email}" style="color:#1a4731;">${email}</a>`)}
      ${row("Phone",   phone || "<em style='color:#aaa;'>Not provided</em>")}
      ${row("Subject", subject)}
      ${row("Message", message.replace(/\n/g, "<br/>"))}
    </table>
    <div style="margin-top:28px;padding:16px 20px;background:#f0f8f4;
                border-left:3px solid #1a4731;border-radius:4px;">
      <p style="margin:0;font-size:13px;color:#0b2e22;">
        Reply directly to this email to respond to <strong>${name}</strong>.
      </p>
    </div>
  `);

// ─── User auto-reply ───────────────────────────────────────────────────────────
const userHTML = ({ name, subject }) =>
  base(`
    <h2 style="margin:0 0 20px;font-size:22px;color:#0b2e22;font-weight:600;line-height:1.3;">
      Thank you, ${name.split(" ")[0]}.<br/>
      <span style="font-weight:400;color:#555;">We've received your message.</span>
    </h2>
    <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.8;">
      We're glad you reached out regarding <strong style="color:#0b2e22;">"${subject}"</strong>.
      A member of our team will review your message and get back to you
      within <strong>24 hours</strong>.
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:#444;line-height:1.8;">
      In the meantime, feel free to explore our portfolio of exclusive
      developments on our website.
    </p>
    <div style="background:#0b2e22;border-radius:8px;padding:24px 28px;margin-bottom:28px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;
                text-transform:uppercase;color:#b8962e;font-weight:600;">Your Subject</p>
      <p style="margin:0;font-size:16px;color:#ffffff;font-weight:500;">${subject}</p>
    </div>
    <p style="margin:0;font-size:14px;color:#888;line-height:1.7;">
      Warm regards,<br/>
      <strong style="color:#0b2e22;">The ${COMPANY} Team</strong>
    </p>
  `);

// ─── Send both emails ──────────────────────────────────────────────────────────
const sendContactEmails = async ({ name, email, phone, subject, message }) => {
  const results = { adminNotified: false, userReplied: false };

  try {
    await resend.emails.send({
      from:    `${COMPANY} Website <${SENDER}>`,
      to:      ADMIN_EMAIL,
      replyTo: email,
      subject: `Website Message: ${subject} — ${name}`,
      html:    adminHTML({ name, email, phone, subject, message }),
    });
    results.adminNotified = true;
  } catch (err) {
    console.error("Contact admin email failed:", err.message);
  }

  try {
    await resend.emails.send({
      from:    `${COMPANY} <${SENDER}>`,
      to:      email,
      subject: `We've received your message — ${COMPANY}`,
      html:    userHTML({ name, subject }),
    });
    results.userReplied = true;
  } catch (err) {
    console.error("Contact user auto-reply failed:", err.message);
  }

  return results;
};

module.exports = { sendContactEmails };
