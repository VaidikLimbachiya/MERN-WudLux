const Order = require("../models/orderModel");
const User = require("../models/userModel");
const { Resend } = require('resend');

// Setup Resend API
const resend = new Resend(process.env.RESEND_API_KEY);

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
  try {
    const { userId, items, totalAmount, shippingAddress, notes, paymentMethod } = req.body;

    if (!userId || !items.length || !totalAmount || !shippingAddress) {
      return res.status(400).json({ success: false, message: "Invalid input." });
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
       paymentMethod: paymentMethod || "Cash On Delivery",
      notes: notes || "",
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    await newOrder.save();

    // ✅ Clear user cart after order placement
    await User.findByIdAndUpdate(userId, { $set: { cart: [] } });

    // ✅ Fetch user details
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Notify admin via Resend with user info now available
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'vadikl5726@gmail.com',
      subject: `🛒 New Order Placed: ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4CAF50;">🛍️ New Order Received</h2>
          <p>Hello Admin,</p>
          <p>A new order has been successfully placed by <strong>${user.firstName} ${user.lastName}</strong> with the following details:</p>
    
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Order ID:</td>
              <td style="padding: 8px;">${orderId}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Customer:</td>
              <td style="padding: 8px;">${user.firstName} ${user.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Total Amount:</td>
              <td style="padding: 8px;">₹${totalAmount}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Shipping Address:</td>
              <td style="padding: 8px;">
                ${shippingAddress.street},<br/>
                ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.zipCode}<br/>
                ${shippingAddress.country}
              </td>
            </tr>
          </table>
    
          <p style="margin-top: 20px;">Please check the <a href="https://your-admin-dashboard-link.com" style="color: #4CAF50; text-decoration: none;">admin dashboard</a> for complete details.</p>
          
          <p>Thank you!</p>
          <hr style="margin-top: 30px;"/>
          <p style="font-size: 12px; color: #999;">This is an automated notification from your e-commerce system.</p>
        </div>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully. Cart has been cleared.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Failed to place order" });
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

    // Notify customer via Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: order.userId.email,
      subject: `Order ${order.orderId} status updated`,
      html: `
        <p>Hello ${order.userId.firstName},</p>
        <p>Your order <strong>${order.orderId}</strong> status has been updated to <strong>${status}</strong>.</p>
      `,
    });

    return res.json({
      success: true,
      message: "Order status updated & user notified via Resend",
      updatedOrder: order,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};
