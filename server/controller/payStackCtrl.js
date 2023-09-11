const https = require("https");
const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");
const ObjectId = require("mongoose").Types.ObjectId;

const payStack = {
  acceptPayment: async (req, res) => {
    try {
      const { email, amount, ref } = req.body;

      // params
      const params = JSON.stringify({
        email: email,
        amount: amount * 100,
        reference: ref,
        callback_url: `http://localhost:3000/payment/verify?mode=paystack`,
      });
      // options
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.PAYSTACK_SECRETKEY,
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
            // If order exist already
            if (
              JSON.parse(data)?.message &&
              JSON.parse(data)?.message === "Duplicate Transaction Reference"
            ) {
              const existingOrder = await Order.findOne({ _id: ref });
              if (!ObjectId.isValid(ref)) {
                return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json({ msg: "Invalid query parameter: " + ref });
              }

              if (!existingOrder) {
                return res
                  .status(StatusCodes.NOT_FOUND)
                  .json({ msg: "No order with id: " + ref });
              }
              return res.status(200).json({
                status: true,
                message: "Authorization URL",
                data: {
                  authorization_url: `https://checkout.paystack.com/${existingOrder.paystackAccessCode}`,
                  access_code: `${existingOrder.paystackAccessCode}`,
                  reference: `${existingOrder._id}`,
                },
              });
            }

            const order = await Order.findOne({ _id: ref });

            order.paystackAccessCode = JSON.parse(data).data.access_code;

            order.save();

            return res.status(StatusCodes.OK).json(JSON.parse(data));
          });
        })
        .on("error", (error) => {
          console.error(error);
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "An error occurred" });
        });

      clientReq.write(params);
      clientReq.end();
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      return res.status(500).json({ msg: "An error occurred" });
    }
  },

  verifyPayment: async (req, res) => {
    const { id: ref } = req.params;

    try {
      // params
      const params = JSON.stringify({});
      // options
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/verify/" + ref,
        method: "GET",
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
            data = JSON.parse(data);
            if (data && data.data?.status === "success") {
              if (!ObjectId.isValid(ref)) {
                return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json({ msg: "Invalid query parameter: " + ref });
              }
              const order = await Order.findOne({ _id: ref });
              if (!order) {
                return res
                  .status(StatusCodes.NOT_FOUND)
                  .json({ msg: "No order with id: " + tx_ref });
              }
              order.status = "paid";

              await order.save();
            }
            return res.status(StatusCodes.OK).json(data);
          });
        })
        .on("error", (error) => {
          console.error(error);
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "An error occurred" });
        });

      clientReq.write(params);
      clientReq.end();
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "An error occurred" });
    }
  },
};

module.exports = payStack;
