const express = require("express");
const { createRazorpayOrder, verifyPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/razorpay-order", createRazorpayOrder);
router.post("/verify", verifyPayment);

module.exports = router;
