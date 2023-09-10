const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Order = require("../models/Order");

const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

const calculateOrderAmount = (items) => {
  const { subTotal, shippingFee } = items.order; // From DB
  if (subTotal + shippingFee !== items.total + items.shipping) {
    throw new BadRequestError("Prices do not match");
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
      throw new BadRequestError("Please provide amount and order ID");
    }

    const order = await Order.findOne({ _id: id });

    if (!order) {
      throw new NotFoundError("No order with with id: " + id);
    }

    const paymentIntents = await stripe.paymentIntents.create({
      amount: calculateOrderAmount({ id, total, shipping, order }),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    order.clientSecret = paymentIntents.client_secret;
    order.save();

    res
      .status(StatusCodes.CREATED)
      .json({ clientSecret: paymentIntents.client_secret });
  },
  verifyPayment: async (req, res) => {
    const { id, orderId } = req.params;
    if (!orderId) {
      throw new NotFoundError("Please provide order id");
    }

    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      throw new BadRequestError("No order with id: " + orderId);
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
