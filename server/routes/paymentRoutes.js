const router = require("express").Router();
const { authenticateUser } = require("../middlewares/authentication");
const payStack = require("../controller/payStackCtrl");

router.post(
  "/paystack/acceptPayment",
  authenticateUser,
  payStack.acceptPayment
);

router.get("/paystack/verifyPayment/:id", payStack.verifyPayment);

module.exports = router;
