require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./src/routes/auth");
const paymentRoutes = require("./src/routes/payments");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  console.warn("[setup] SESSION_SECRET is missing or shorter than 32 characters. Set it in .env before using accounts.");
}
if (!process.env.MONGODB_URI) {
  console.warn("[setup] MONGODB_URI is missing. Set it in .env to enable account and order storage.");
}

app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://checkout.razorpay.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "blob:", "https://images.unsplash.com"],
      connectSrc: ["'self'", "https://api.razorpay.com"],
      frameSrc: ["https://api.razorpay.com", "https://checkout.razorpay.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: isProduction ? [] : null
    }
  }
}));
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-7", legacyHeaders: false }));

const sessionOptions = {
  name: "rigora.sid",
  secret: process.env.SESSION_SECRET || "development-only-change-this-session-secret-32chars",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};
if (process.env.MONGODB_URI) {
  sessionOptions.store = MongoStore.create({ mongoUrl: process.env.MONGODB_URI, collectionName: "sessions", ttl: 60 * 60 * 24 * 7 });
}
app.use(session(sessionOptions));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "not connected",
    paymentConfigured: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));
app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.use((error, _req, res, _next) => {
  console.error("[server error]", error.message);
  if (res.headersSent) return;
  res.status(500).json({ message: "Something went wrong on the server. Check the terminal for details." });
});

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
      console.log("[database] Connected to MongoDB.");
    } catch (error) {
      console.error("[database] Could not connect to MongoDB:", error.message);
      console.error("[database] Check MONGODB_URI, Atlas network access, and database user credentials.");
    }
  }
  app.listen(PORT, () => console.log(`[server] Rigora is running at http://localhost:${PORT}`));
}

start();
