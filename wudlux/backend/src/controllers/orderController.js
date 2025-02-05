const Order = require("../models/orderModel");

// Get all orders (with pagination)
exports.getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10

    const orders = await Order.find()
      .populate("userId", "firstName lastName email") // Populate user details
      .populate("items.productId", "title images") // Populate product details (title, images)
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

// Get Orders by User ID
exports.getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from URL params

    console.log("Fetching orders for userId:", userId); // Debugging log

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required in the request.",
      });
    }

    // Find all orders for the given userId
    const orders = await Order.find({ userId })
      .populate("userId", "name email") // Include user details
      .populate("items.productId", "name price image"); // Include product details

    // Check if orders exist
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: `No orders found for user ID ${userId}`,
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("❌ Error fetching orders by user ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get Order by ID
exports.getOrderByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(`Fetching order details for orderId: ${orderId}`);

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID is required" });
    }

    // Populate `userId` and `items.productId` properly
    const order = await Order.findOne({ orderId })
      .populate("userId", "firstName lastName email") // Fetch First & Last Name
      .populate({
        path: "items.productId",
        select: "title images price", // Fetch Product Title, Images, and Price
      });

    console.log("✅ Populated Order Data:", JSON.stringify(order, null, 2)); // Debugging log

    if (!order) {
      return res
        .status(404)
        .json({
          success: false,
          message: `Order with ID ${orderId} not found`,
        });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("❌ Error fetching order:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch order",
        error: error.message,
      });
  }
};

// Function to generate custom Order ID
const generateOrderId = () => {
  const prefix = "#WU"; // Fixed prefix
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number
  return `${prefix}${randomNum}`;
};

// Create an order
exports.createOrder = async (req, res) => {
  try {
    console.log("Incoming Order Request:", req.body); // Debugging log

    const { userId, items, totalAmount, shippingAddress, notes } = req.body;

    // Validate request data
    if (
      !userId ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !totalAmount ||
      !shippingAddress
    ) {
      console.error("❌ Missing required fields:", req.body);
      return res.status(400).json({
        success: false,
        message:
          "Invalid input. Ensure all required fields are filled correctly.",
      });
    }

    // Generate unique Order ID
    const orderId = generateOrderId();

    // Create new order
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

    // Save to DB
    await newOrder.save();

    console.log("✅ Order created successfully:", newOrder);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ Server error during order creation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};
