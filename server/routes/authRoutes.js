const router = require("express").Router();

const {
  register,
  verifyEmail,
  login,
  logout,
} = require("../controller/authCtrl");

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
