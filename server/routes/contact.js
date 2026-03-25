const express    = require("express");
const router     = express.Router();
const rateLimit  = require("express-rate-limit");
const Contact    = require("../models/Contact");
const { sendContactEmails } = require("../utils/contactMailer");

// ── Sanitisation helpers ───────────────────────────────────────────────────────
const stripTags    = (s) => String(s).replace(/<[^>]*>/g, "").trim();
const isValidEmail = (e) => /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(String(e).trim());
const isValidPhone = (p) => !p || /^[+\d\s\-()\\.]{7,20}$/.test(String(p).trim());

// ── Rate limiter: 5 messages per IP per hour ───────────────────────────────────
const contactLimiter = rateLimit({
  windowMs:        60 * 60 * 1000,
  max:             5,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { error: "Too many messages sent. Please try again later." },
});

// POST /api/contact
router.post("/contact", contactLimiter, async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // ── Presence checks ──────────────────────────────────────────────────────────
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Name, email, subject and message are required." });
  }

  // ── Type safety ──────────────────────────────────────────────────────────────
  if ([name, email, subject, message].some((f) => typeof f !== "string")) {
    return res.status(400).json({ error: "Invalid data." });
  }

  // ── Sanitise ─────────────────────────────────────────────────────────────────
  const cleanName    = stripTags(name).replace(/[^a-zA-ZÀ-ÿ\s'\-]/g, "").slice(0, 80);
  const cleanEmail   = stripTags(email).toLowerCase().slice(0, 254);
  const cleanPhone   = phone ? stripTags(String(phone)).slice(0, 20) : "";
  const cleanSubject = stripTags(subject).slice(0, 120);
  const cleanMessage = stripTags(message).slice(0, 1500);

  // ── Validate ─────────────────────────────────────────────────────────────────
  if (cleanName.length < 2)          return res.status(400).json({ error: "Invalid name."    });
  if (!isValidEmail(cleanEmail))     return res.status(400).json({ error: "Invalid email."   });
  if (!isValidPhone(cleanPhone))     return res.status(400).json({ error: "Invalid phone."   });
  if (cleanSubject.length < 2)       return res.status(400).json({ error: "Invalid subject." });
  if (cleanMessage.length < 5)       return res.status(400).json({ error: "Message too short." });

  try {
    // ── Save to MongoDB ───────────────────────────────────────────────────────
    const contact = await Contact.create({
      name:      cleanName,
      email:     cleanEmail,
      phone:     cleanPhone,
      subject:   cleanSubject,
      message:   cleanMessage,
      ipAddress: req.ip,
    });

    // ── Send emails ───────────────────────────────────────────────────────────
    const emailResults = await sendContactEmails({
      name:    cleanName,
      email:   cleanEmail,
      phone:   cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
    });

    // ── Update delivery status ────────────────────────────────────────────────
    await Contact.findByIdAndUpdate(contact._id, { emailsSent: emailResults });

    return res.status(200).json({ success: true, message: "Message received!" });

  } catch (err) {
    console.error("Contact submission error:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

module.exports = router;
