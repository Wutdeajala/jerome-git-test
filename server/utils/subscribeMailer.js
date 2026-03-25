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

        <!-- Header -->
        <tr>
          <td style="background:#0b2e22;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;
                      color:#b8962e;font-weight:600;">Premium Real Estate</p>
            <h1 style="margin:8px 0 0;font-size:26px;color:#ffffff;font-weight:600;
                       letter-spacing:0.5px;">${COMPANY}</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">${content}</td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f8f5;padding:24px 40px;text-align:center;
                     border-top:1px solid #ede9e0;">
            <p style="margin:0;font-size:12px;color:#999;line-height:1.6;">
              ${COMPANY} · Abuja, Nigeria<br/>
              You're receiving this because you subscribed on our website.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

// ─── Subscriber confirmation email ────────────────────────────────────────────
const confirmationHTML = ({ email }) =>
  base(`
    <!-- Welcome icon -->
    <div style="text-align:center;margin-bottom:28px;">
      <div style="display:inline-block;background:#0b2e22;border-radius:50%;
                  width:60px;height:60px;line-height:60px;font-size:26px;">
        ✉️
      </div>
    </div>

    <h2 style="margin:0 0 12px;font-size:22px;color:#0b2e22;font-weight:600;
               text-align:center;line-height:1.3;">
      You're on the list!
    </h2>

    <p style="margin:0 0 20px;font-size:15px;color:#444;line-height:1.8;text-align:center;">
      Thank you for subscribing to <strong style="color:#0b2e22;">${COMPANY}</strong>.
      You'll be among the first to hear about our exclusive new listings,
      market insights, and property developments across Nigeria.
    </p>

    <!-- Divider -->
    <div style="width:48px;height:2px;background:linear-gradient(to right,#b8962e,#d4af50);
                border-radius:1px;margin:28px auto;"></div>

    <p style="margin:0 0 28px;font-size:14px;color:#666;line-height:1.8;text-align:center;">
      We respect your inbox — expect only curated, valuable updates.<br/>
      You can unsubscribe at any time.
    </p>

    <!-- Properties CTA -->
    <div style="background:#0b2e22;border-radius:10px;padding:28px 32px;text-align:center;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;
                color:#b8962e;font-weight:600;">Explore Our Portfolio</p>
      <p style="margin:0 0 20px;font-size:16px;color:#ffffff;font-weight:400;line-height:1.6;">
        Discover our current selection of premium residences across Abuja.
      </p>
      <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/properties"
         style="display:inline-block;padding:12px 28px;background:#b8962e;color:#0b2e22;
                text-decoration:none;border-radius:100px;font-size:13px;font-weight:600;
                letter-spacing:0.08em;text-transform:uppercase;">
        View Properties
      </a>
    </div>

    <p style="margin:28px 0 0;font-size:14px;color:#888;line-height:1.7;text-align:center;">
      Warm regards,<br/>
      <strong style="color:#0b2e22;">The ${COMPANY} Team</strong>
    </p>
  `);

// ─── Admin notification (new subscriber) ─────────────────────────────────────
const adminHTML = ({ email }) =>
  base(`
    <h2 style="margin:0 0 6px;font-size:20px;color:#0b2e22;font-weight:600;">
      New Newsletter Subscriber
    </h2>
    <p style="margin:0 0 28px;font-size:13px;color:#888;">
      Subscribed via the website footer
    </p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0ede8;width:100px;vertical-align:top;">
          <span style="font-size:11px;font-weight:600;letter-spacing:1px;
                       text-transform:uppercase;color:#aaa;">Email</span>
        </td>
        <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f0ede8;">
          <a href="mailto:${email}" style="font-size:14px;color:#1a4731;">${email}</a>
        </td>
      </tr>
    </table>

    <div style="margin-top:24px;padding:14px 18px;background:#f0f8f4;
                border-left:3px solid #1a4731;border-radius:4px;">
      <p style="margin:0;font-size:13px;color:#0b2e22;">
        Your mailing list is growing. View all subscribers in your MongoDB dashboard.
      </p>
    </div>
  `);

// ─── Send both emails ─────────────────────────────────────────────────────────
const sendSubscriberEmails = async ({ email }) => {
  const results = { confirmationSent: false };

  // Confirmation to subscriber
  try {
    await resend.emails.send({
      from:    `${COMPANY} <${SENDER}>`,
      to:      email,
      subject: `You're subscribed — ${COMPANY}`,
      html:    confirmationHTML({ email }),
    });
    results.confirmationSent = true;
  } catch (err) {
    console.error("Subscriber confirmation email failed:", err.message);
  }

  // Notify admin of new subscriber
  try {
    await resend.emails.send({
      from:    `${COMPANY} Subscriptions <${SENDER}>`,
      to:      ADMIN_EMAIL,
      subject: `New Subscriber: ${email}`,
      html:    adminHTML({ email }),
    });
  } catch (err) {
    console.error("Subscriber admin notify failed:", err.message);
  }

  return results;
};

module.exports = { sendSubscriberEmails };
