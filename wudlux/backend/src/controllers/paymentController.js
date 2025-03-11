const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");

// Initialize Razorpay
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Add your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Add your Razorpay Key Secret
});

// Create Razorpay Order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amount * 100, // Razorpay expects amount in paisa
      currency,
      receipt,
    });

    res.status(201).json({
      success: true,
      razorpayOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
    try {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  
      // Validate signature
      const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");
  
      if (generatedSignature !== razorpaySignature) {
        return res.status(400).json({
          success: false,
          message: "Invalid payment signature",
        });
      }
  
      // Update order status in your database
      await Order.findOneAndUpdate(
        { razorpayOrderId },
        { paymentStatus: "Paid" }
      );
  
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to verify payment",
        error: error.message,
      });
    }
  };
  