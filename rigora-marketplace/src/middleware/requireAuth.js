module.exports = function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Please sign in before continuing to checkout." });
  }
  next();
};
