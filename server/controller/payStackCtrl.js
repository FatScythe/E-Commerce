const https = require("https");

const payStack = {
  acceptPayment: async (req, res) => {
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
          Authorization: process.env.PAYSTACK_SECRETKEY, // where you place your secret key copied from your dashboard
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
          apiRes.on("end", () => {
            console.log(JSON.parse(data));
            return res.status(200).json(data);
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

const initializePayment = payStack;
module.exports = initializePayment;
