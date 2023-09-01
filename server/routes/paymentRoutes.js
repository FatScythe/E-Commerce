const router = require("express").Router();
const { payStackIntent } = require("../controller/payStackCtrl");

router.post("/paystack", payStackIntent);

module.exports = router;
