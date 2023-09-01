const paystack = (request) => {
  const MySecretKey = `Bearer ${process.env.PAYSTACK_SECRETKEY}`;
  //sk_test_xxxx to be replaced by your own secret key
  const initializePayment = (form, mycallback) => {
    const option = {
      url: "https://api.paystack.co/transaction/initialize",
      headers: {
        authorization: MySecretKey,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      form,
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(option, callback);
  };

  const verifyPayment = (ref, mycallback) => {
    const option = {
      url:
        "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
      headers: {
        authorization: MySecretKey,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(option, callback);
  };
  return { initializePayment, verifyPayment };
};

const payStackIntent = async (req, res) => {
  const { full_name, email, amount } = req.body;
  const form = { full_name, email, amount };
  form.metadata = {
    full_name: full_name,
  };
  form.amount *= 100;
  initializePayment(form, (error, body) => {
    if (error) {
      //handle errors
      console.log(error);
      return;
    }
    response = JSON.parse(body);
    res.redirect(response.data.authorization_url);
  });
};

module.exports = {
  paystack,
  payStackIntent,
};
