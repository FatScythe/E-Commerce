const router = require("express").Router();
const { authenticateUser } = require("../middlewares/authentication");
const stripe = require("../controller/stripeCtrl");
const payStack = require("../controller/payStackCtrl");

router.post(
  "/paystack/acceptPayment",
  authenticateUser,
  payStack.acceptPayment
);

router.get("/paystack/verifyPayment/:id", payStack.verifyPayment);

router.post(
  "/stripe/create-payment-intent",
  authenticateUser,
  stripe.createPaymentIntent
);

router.get("/stripe/verifyPayment/:id/:orderId", stripe.verifyPayment);

module.exports = router;
