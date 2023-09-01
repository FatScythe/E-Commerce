const router = require("express").Router();
const initializePayment = require("../controller/payStackCtrl");

router.post("/paystackAcceptPayment", initializePayment.acceptPayment);

module.exports = router;
