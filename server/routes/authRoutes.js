const router = require("express").Router();

const {
  register,
  verifyEmail,
  login,
  logout,
  resetPassword,
  forgotPassword,
} = require("../controller/authCtrl");

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
