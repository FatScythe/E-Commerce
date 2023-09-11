const router = require("express").Router();
const { authenticateUser } = require("../middlewares/authentication");
const stripe = require("../controller/stripeCtrl");
const payStack = require("../controller/payStackCtrl");
const flutterwave = require("../controller/flutterwaveCtrl");

// PAYSTACK
router.post(
  "/paystack/acceptPayment",
  authenticateUser,
  payStack.acceptPayment
);
router.get("/paystack/verifyPayment/:id", payStack.verifyPayment);

// STRIPE
router.post(
  "/stripe/create-payment-intent",
  authenticateUser,
  stripe.createPaymentIntent
);
router.get("/stripe/verifyPayment/:id/:orderId", stripe.verifyPayment);

// FLUTTERWAVE
router.post(
  "/flutterwave/acceptPayment",
  authenticateUser,
  flutterwave.acceptPayment
);

router.get("/flutterwave/verifyPayment/:id", flutterwave.verifyPayment);

module.exports = router;
