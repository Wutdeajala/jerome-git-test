const rateLimit = require("express-rate-limit");

// ── Allowed property values (mirror the frontend dropdown exactly) ─────────────
const VALID_PROPERTIES = [
  "Park Villa — Maitama, Abuja",
  "Park Villas II — Maitama, Abuja",
  "541 Residence — Wuye, Abuja",
  "Enclave Estate — Asokoro, Abuja",
  "Saada Court — Apo Resettlement, Abuja",
  "Ummahani Court — Galadima, Abuja",
];

// ── Strip HTML / script tags ───────────────────────────────────────────────────
const stripTags = (str) =>
  String(str).replace(/<[^>]*>/g, "").trim();

// ── Email format check ─────────────────────────────────────────────────────────
const isValidEmail = (email) =>
  /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(String(email).trim());

// ── Rate limiter: max 5 enquiries per IP per hour ─────────────────────────────
const enquiryLimiter = rateLimit({
  windowMs:         60 * 60 * 1000,   // 1 hour
  max:              5,
  standardHeaders:  true,
  legacyHeaders:    false,
  message: {
    error: "Too many enquiries submitted from this device. Please try again later.",
  },
});

// ── Main validation middleware ─────────────────────────────────────────────────
const validateEnquiry = (req, res, next) => {
  const { name, email, property, message } = req.body;

  // ── Presence checks ──────────────────────────────────────────────────────────
  if (!name || !email || !property) {
    return res.status(400).json({ error: "Name, email and property are required." });
  }

  // ── Type checks (everything must be a string) ────────────────────────────────
  if (
    typeof name    !== "string" ||
    typeof email   !== "string" ||
    typeof property !== "string"
  ) {
    return res.status(400).json({ error: "Invalid data types." });
  }

  // ── Sanitise ─────────────────────────────────────────────────────────────────
  const cleanName     = stripTags(name).replace(/[^a-zA-ZÀ-ÿ\s'\-]/g, "").slice(0, 80);
  const cleanEmail    = stripTags(email).toLowerCase().slice(0, 254);
  const cleanProperty = stripTags(property);
  const cleanMessage  = message ? stripTags(String(message)).slice(0, 1000) : "";

  // ── Validation rules ─────────────────────────────────────────────────────────
  if (cleanName.length < 2) {
    return res.status(400).json({ error: "Please provide a valid full name." });
  }

  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  if (!VALID_PROPERTIES.includes(cleanProperty)) {
    return res.status(400).json({ error: "Invalid property selection." });
  }

  // ── Attach sanitised values back to req.body ──────────────────────────────────
  req.body = {
    name:      cleanName,
    email:     cleanEmail,
    property:  cleanProperty,
    message:   cleanMessage,
    ipAddress: req.ip,
  };

  next();
};

module.exports = { validateEnquiry, enquiryLimiter };
