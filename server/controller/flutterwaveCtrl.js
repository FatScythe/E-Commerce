const https = require("https");
const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const { BadRequestError } = require("../errors");
const ObjectId = require("mongoose").Types.ObjectId;

const flutterwave = {
  acceptPayment: async (req, res) => {
    const { name, email, amount, ref } = req.body;
    try {
      if (!name || !email || !ref) {
        throw new BadRequestError("Please fill all field");
      }

      // params
      const params = JSON.stringify({
        tx_ref: ref,
        amount: amount,
        currency: "NGN",
        redirect_url: `http://localhost:3000/payment/verify?mode=flutterwave`,
        customer: {
          email,
          name,
        },
      });

      // options
      const options = {
        hostname: "api.flutterwave.com",
        port: 443,
        path: "/v3/payments",
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.FLW_SECRET_KEY,
          "Content-Type": "application/json",
        },
      };

      // client request to flutter API
      const clientReq = https
        .request(options, (apiRes) => {
          let data = "";
          apiRes.on("data", (chunk) => {
            data += chunk;
          });
          apiRes.on("end", async () => {
            data = JSON.parse(data);
            return res.status(StatusCodes.OK).json({ ...data });
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
      console.error(error);
      return res.status(500).json({ msg: "An error occurred" });
    }
  },
  verifyPayment: async (req, res) => {
    try {
      const { id: ref } = req.params;
      // params
      const params = JSON.stringify({});
      // options
      const options = {
        hostname: "api.flutterwave.com",
        port: 443,
        path: `/v3/transactions/${ref}/verify`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.FLW_SECRET_KEY,
          "content-type": "application/json",
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

            if (data && data.data?.status === "successful") {
              if (!ObjectId.isValid(data.data.tx_ref)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                  msg: "Invalid query parameter: " + data.data.tx_ref,
                });
              }
              const order = await Order.findOne({
                _id: data.data.tx_ref,
              });

              if (!order) {
                return res
                  .status(StatusCodes.NOT_FOUND)
                  .json({ msg: "No order with id: " + data.data.tx_ref });
              }

              order.status = "paid";
              order.flutterTrxId = data.data.id;
              await order.save();
            }

            return res.status(StatusCodes.OK).json({ ...data });
          });
        })
        .on("error", (error) => {
          console.error(error);

          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "An error occurred" });
        });

      clientReq.write(params);
      clientReq.end();
    } catch (error) {
      console.error(error);

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred" });
    }
  },
};

module.exports = flutterwave;
