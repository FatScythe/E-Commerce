const convertCurrency = (amount) => {
  if (localStorage.getItem("settings")) {
    const { currency } = JSON.parse(localStorage.getItem("settings"));
    if (currency === "$") {
      return { amount: amount * 1000, currency: "$" };
    }
  }
  return { amount, currency: "₦" };
};

export default convertCurrency;
