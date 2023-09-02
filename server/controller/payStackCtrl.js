const https = require("https");
const Order = require("../models/Order");
const { NotFoundError } = require("../errors");
const { log } = require("console");

const payStack = {
  acceptPayment: async (req, res) => {
    try {
      // request body from the clients
      const { email, amount, ref } = req.body;

      // params
      const params = JSON.stringify({
        email: email,
        amount: amount * 100,
        reference: ref,
        callback_url: `http://localhost:3000?ref=${ref}`,
      });
      // options
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.PAYSTACK_SECRETKEY, // where you place your secret key copied from your dashboard
          "Content-Type": "application/json",
        },
      };
      // client request to paystack API
      const clientReq = https
        .request(options, (apiRes) => {
          let data = "";
          apiRes.on("data", (chunk) => {
            data += chunk;
          });
          apiRes.on("end", async () => {
            if (
              !JSON.parse(data)?.message &&
              !JSON.parse(data)?.message === "Duplicate Transaction Reference"
            ) {
              const existingOrder = await Order.findOne({ _id: ref });
              if (!existingOrder) {
                throw new NotFoundError("No order with id: " + ref);
              }
              return res.status(200).json({
                status: true,
                message: "Authorization URL",
                data: {
                  authorization_url: `https://checkout.paystack.com/${existingOrder.payAccessCode}`,
                  access_code: `${existingOrder.payAccessCode}`,
                  reference: `${existingOrder._id}`,
                },
              });
            }

            const order = await Order.findOne({ _id: ref });

            order.payStackUrl = JSON.parse(data).data.access_code;

            order.save();

            return res.status(200).json(JSON.parse(data));
          });
        })
        .on("error", (error) => {
          console.error(error);
        });

      clientReq.write(params);
      clientReq.end();
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },

  verifyPayment: async (req, res) => {
    console.log(req.payStackReferenceId);
    return res.send("Hello");
    try {
      // request body from the clients
      const { email, amount, ref } = req.body;

      // params
      const params = JSON.stringify({
        email: email,
        amount: amount * 100,
        ref,
      });
      // options
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.PAYSTACK_SECRETKEY, // where you place your secret key copied from your dashboard
          "Content-Type": "application/json",
        },
      };
      // client request to paystack API
      const clientReq = https
        .request(options, (apiRes) => {
          let data = "";
          apiRes.on("data", (chunk) => {
            data += chunk;
          });
          apiRes.on("end", async () => {
            const order = await Order.findOne({ _id: ref });
            order.payStackReferenceId = JSON.parse(data).data.reference;

            await order.save();

            return res.status(200).json(JSON.parse(data));
          });
        })
        .on("error", (error) => {
          console.error(error);
        });

      clientReq.write(params);
      clientReq.end();
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
};

// const initializePayment = payStack;
module.exports = payStack;
