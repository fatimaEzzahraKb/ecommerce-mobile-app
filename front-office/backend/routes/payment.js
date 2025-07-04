const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const { createPaymentIntent } = require("../controllers/PaymentController");

router.post("/create-payment-intent", auth ,createPaymentIntent);

module.exports = router;
