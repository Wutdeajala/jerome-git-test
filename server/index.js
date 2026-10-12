require("dotenv").config();   // ← must be first — loads .env before anything else

const express         = require("express");
const mongoose        = require("mongoose");
const cors            = require("cors");
const helmet          = require("helmet");
const rateLimit       = require("express-rate-limit");
const enquiryRouter   = require("./routes/enquiry");
const contactRouter   = require("./routes/contact");
const subscribeRouter = require("./routes/subscribe");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Trust Render's proxy so rate limiting sees real client IPs ────────────────
app.set("trust proxy", 1);

// ── Strip MongoDB operators ($gt, $ne, ...) from query filters ────────────────
mongoose.set("sanitizeFilter", true);

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS — only allow requests from your React app ────────────────────────────
const isProd = process.env.NODE_ENV === "production";
const allowedOrigins = [
  ...(isProd ? [] : ["http://localhost:5173", "http://localhost:3000"]),
  process.env.CLIENT_URL?.replace(/\/$/, ""),   // live domain, no trailing slash
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // allow requests with no origin (e.g. Postman, curl during dev)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    const err = new Error("Not allowed by CORS");
    err.status = 403;
    cb(err);
  },
  methods: ["POST"],
}));

// ── Rate limiting for all API routes ──────────────────────────────────────────
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 30,                    // 30 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
}));

// ── Body parsing — limit payload size to prevent abuse ────────────────────────
app.use(express.json({ limit: "10kb" }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api", enquiryRouter);
app.use("/api", contactRouter);
app.use("/api", subscribeRouter);

// ── Health check (used by Render) ─────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;

  if (status >= 500) {
    console.error("Unhandled error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }

  const msg = err.type === "entity.parse.failed" ? "Invalid JSON." : err.message;
  return res.status(status).json({ error: msg });
});

// ── Database → then start server ──────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });