const express = require("express");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");

const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 12,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many attempts. Please wait a little and try again." }
});

function publicUser(user) {
  return { id: user._id.toString(), name: user.name, email: user.email };
}

router.get("/me", async (req, res, next) => {
  try {
    if (!req.session.userId) return res.json({ user: null });
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.session.destroy(() => {});
      return res.json({ user: null });
    }
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.post("/register", authLimiter, async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (name.length < 2 || name.length > 80) {
      return res.status(400).json({ message: "Name must be between 2 and 80 characters." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address." });
    }
    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "An account with this email already exists. Please sign in." });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });
    req.session.userId = user._id.toString();
    req.session.save((error) => {
      if (error) return next(error);
      res.status(201).json({ message: "Account created successfully.", user: publicUser(user) });
    });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "An account with this email already exists. Please sign in." });
    next(error);
  }
});

router.post("/login", authLimiter, async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!email || !password) return res.status(400).json({ message: "Enter your email and password." });

    const user = await User.findOne({ email }).select("+passwordHash");
    const valid = user && await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Email or password is incorrect." });

    // Regenerate the session ID after authentication to reduce session-fixation risk.
    req.session.regenerate((error) => {
      if (error) return next(error);
      req.session.userId = user._id.toString();
      req.session.save((saveError) => {
        if (saveError) return next(saveError);
        res.json({ message: "Signed in successfully.", user: publicUser(user) });
      });
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("rigora.sid", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    res.json({ message: "Signed out successfully." });
  });
});

module.exports = router;
