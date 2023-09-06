const router = require("express").Router();
const { authenticateUser } = require("../middlewares/authentication");
const stripeController = require("../controller/stripeCtrl");
const payStack = require("../controller/payStackCtrl");

router.post(
  "/paystack/acceptPayment",
  authenticateUser,
  payStack.acceptPayment
);

router.get("/paystack/verifyPayment/:id", payStack.verifyPayment);

router.post(
  "/stripe/create-checkout-session",
  authenticateUser,
  stripeController
);

module.exports = router;
