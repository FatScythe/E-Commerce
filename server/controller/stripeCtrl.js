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

    res.json({ clientSecret: paymentIntents.client_secret });
  },
};

module.exports = stripeCtrl;
