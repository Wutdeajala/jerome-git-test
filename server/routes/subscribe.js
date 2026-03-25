const express    = require("express");
const router     = express.Router();
const rateLimit  = require("express-rate-limit");
const Subscriber = require("../models/Subscriber");
const { sendSubscriberEmails } = require("../utils/subscribeMailer");

// ── Rate limiter: 5 attempts per IP per hour ───────────────────────────────────
const subscribeLimiter = rateLimit({
  windowMs:        60 * 60 * 1000,
  max:             5,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { error: "Too many requests. Please try again later." },
});

// ── Email validation ───────────────────────────────────────────────────────────
const isValidEmail = (e) =>
  /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(String(e).trim());

// POST /api/subscribe
router.post("/subscribe", subscribeLimiter, async (req, res) => {
  const { email } = req.body;

  // ── Basic checks ─────────────────────────────────────────────────────────────
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  const cleanEmail = String(email).trim().toLowerCase().slice(0, 254);

  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    // ── Check for duplicate ───────────────────────────────────────────────────
    const existing = await Subscriber.findOne({ email: cleanEmail });

    if (existing && existing.active) {
      // Already subscribed — return success silently (don't reveal DB state)
      return res.status(200).json({ success: true, message: "Subscribed!" });
    }

    if (existing && !existing.active) {
      // Previously unsubscribed — re-activate
      existing.active = true;
      await existing.save();

      await sendSubscriberEmails({ email: cleanEmail });

      return res.status(200).json({ success: true, message: "Welcome back!" });
    }

    // ── New subscriber — save to DB ───────────────────────────────────────────
    const subscriber = await Subscriber.create({
      email:     cleanEmail,
      ipAddress: req.ip,
    });

    // ── Send confirmation + admin notify ──────────────────────────────────────
    const emailResults = await sendSubscriberEmails({ email: cleanEmail });

    await Subscriber.findByIdAndUpdate(subscriber._id, {
      emailsSent: emailResults,
    });

    return res.status(200).json({ success: true, message: "Subscribed!" });

  } catch (err) {
    // Mongoose duplicate key error (race condition safety net)
    if (err.code === 11000) {
      return res.status(200).json({ success: true, message: "Subscribed!" });
    }

    console.error("Subscribe error:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

module.exports = router;
