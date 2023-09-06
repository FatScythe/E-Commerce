const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

const calculateOrderAmount = (items) => {
  // compare on the database
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return items.total_amount + items.shipping_fee;
};

const stripeController = async (req, res) => {
  // const { purchase, total_amount, shipping_fee } = req.body;

  // const paymentIntents = await stripe.paymentIntents.create({
  //   amount: calculateOrderAmount({ total_amount, shipping_fee }),
  //   currency: "usd",
  //   automatic_payment_methods: {
  //     enabled: true,
  //   },
  // });

  // res.json({ clientSecret: paymentIntents.client_secret });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 2000,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/paystack/verify?success=true`,
    cancel_url: `http://localhost:3000/paystack/verify?canceled=true`,
  });

  console.log(session);

  res.redirect(303, session.url);
};

module.exports = stripeController;
