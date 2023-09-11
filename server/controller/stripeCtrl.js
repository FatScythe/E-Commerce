const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const ObjectId = require("mongoose").Types.ObjectId;
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

const calculateOrderAmount = (items) => {
  const { subTotal, shippingFee } = items.order; // From DB
  if (subTotal + shippingFee !== items.total + items.shipping) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Prices do not match" });
  }

  // Comvert to dollar

  return items.total + items.shipping;
};

const stripeCtrl = {
  createPaymentIntent: async (req, res) => {
    let { total, shipping, id } = req.body;
    if (!shipping) {
      shipping = 0;
    }

    if (!total || !id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide amount and order ID" });
    }

    if (!ObjectId.isValid(id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid query parameter: " + id });
    }

    const order = await Order.findOne({ _id: id });

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No order with with id: " + id });
    }

    const paymentIntents = await stripe.paymentIntents.create({
      amount: calculateOrderAmount({ id, total, shipping, order }),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    order.stripeClientSecret = paymentIntents.client_secret;
    order.save();

    res
      .status(StatusCodes.CREATED)
      .json({ clientSecret: paymentIntents.client_secret });
  },
  verifyPayment: async (req, res) => {
    const { id, orderId } = req.params;
    if (!orderId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide amount and order ID" });
    }

    if (!ObjectId.isValid(orderId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid query parameter: " + orderId });
    }

    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No order with id: " + orderId });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(id);

    if (paymentIntent?.status === "succeeded") {
      order.status = "paid";

      await order.save();
    }
    res.status(StatusCodes.OK).json({ ...paymentIntent });
  },
};

module.exports = stripeCtrl;
