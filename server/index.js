require("dotenv").config();   // ← must be first — loads .env before anything else

const express         = require("express");
const mongoose        = require("mongoose");
const cors            = require("cors");
const helmet          = require("helmet");
const enquiryRouter   = require("./routes/enquiry");
const contactRouter   = require("./routes/contact");
const subscribeRouter = require("./routes/subscribe");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS — only allow requests from your React app ────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",   // Vite dev server
  "http://localhost:3000",   // CRA dev server (if applicable)
  process.env.CLIENT_URL,    // your live domain once deployed
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // allow requests with no origin (e.g. mobile apps, Postman during dev)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  methods: ["POST"],
}));

// ── Body parsing — limit payload size to prevent abuse ────────────────────────
app.use(express.json({ limit: "10kb" }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api", enquiryRouter);
app.use("/api", contactRouter);
app.use("/api", subscribeRouter);

// ── Health check (useful for Render.com) ─────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
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
