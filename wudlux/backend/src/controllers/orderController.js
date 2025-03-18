const Order = require("../models/orderModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

// Check env before creating transporter
if (
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS ||
  !process.env.ADMIN_EMAIL
) {
  console.error("❌ EMAIL_USER, EMAIL_PASS, or ADMIN_EMAIL not set in .env file");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
});

exports.getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("userId", "firstName lastName email")
      .populate("items.productId", "title images")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        totalOrders,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrders / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .populate("userId", "name email")
      .populate("items.productId", "name price image");

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: `No orders found for user ID ${userId}`,
      });
    }
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

exports.getOrderByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId })
      .populate("userId", "firstName lastName email")
      .populate("items.productId", "title images price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order with ID ${orderId} not found`,
      });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  console.log("🔔 createOrder API called");

  try {
    const { userId, items, totalAmount, shippingAddress, notes } = req.body;

    if (!userId || !items.length || !totalAmount || !shippingAddress) {
      console.log("❌ Missing order data");
      return res
        .status(400)
        .json({ success: false, message: "Invalid input." });
    }

    const orderId = `#WU${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = new Order({
      orderId,
      userId,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      shippingAddress,
      notes: notes || "",
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    await newOrder.save();
    console.log("✅ Order saved in DB:", orderId);

    // ✅ Copying exact email send logic that worked in /send-test route
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `🛒 New Order - ${orderId}`,
      text: `New order placed by User ID: ${userId}\nOrder Total: ₹${totalAmount}\nOrder ID: ${orderId}`,
    });

    console.log("✅ Email sent inside createOrder:", info.response);

    return res.status(201).json({
      success: true,
      message: "Order created & admin notified.",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ createOrder error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};




exports.updateOrderStatus = async (req, res, io) => {
  const { orderId, status } = req.body;

  try {
    if (!orderId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId or status" });
    }

    const isMongoId = orderId.match(/^[0-9a-fA-F]{24}$/);

    const order = isMongoId
      ? await Order.findById(orderId).populate("userId")
      : await Order.findOne({ orderId }).populate("userId");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    io.emit("orderUpdated", { orderId: order._id, status });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.userId.email,
      subject: `Order ${order.orderId} status updated`,
      html: `<p>Hello ${order.userId.firstName},</p><p>Your order <strong>${order.orderId}</strong> status has been updated to <strong>${status}</strong>.</p>`,
    });

    return res.json({
      success: true,
      message: "Order status updated & user notified",
      updatedOrder: order,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};
