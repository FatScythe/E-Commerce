const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const {
  register,
  verifyEmail,
  login,
  logout,
  resetPassword,
  forgotPassword,
} = require("../controller/authCtrl");

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  limit: 2,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "You can register again after in less than 15min",
});

router.post("/register", registerLimiter, register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
