const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const addressRoutes = require("./src/routes/addressRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const Order = require("./src/models/orderModel"); 

dotenv.config();

const app = express();
const server = http.createServer(app); // 
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("🔵 A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(uploadDir));
app.use("/api/auth", authRoutes);
app.use("/addresses", addressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const isValidRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return null; 
  }
};

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

app.post("/api/auth/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken; 
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }
  const decoded = isValidRefreshToken(refreshToken);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
const newAccessToken = generateAccessToken(decoded.id);
  res.json({ accessToken: newAccessToken });
});

app.post("/api/order/status", async (req, res) => {
  const { orderId, status } = req.body;
  console.log("🔄 Updating Order:", { orderId, status });
  try {
    if (!orderId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId or status" });
    }
<<<<<<< HEAD

    // ✅ Ensure `Order` model is imported
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

=======
    const order = await Order.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });
>>>>>>> a22aabe8579dd0b157150b77a46b9dbef0817d5d
    if (!order) {
      console.error("❌ Order not found:", orderId);
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    io.emit("orderUpdated", { orderId, status });
<<<<<<< HEAD

    res.json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder: order,
    });
=======
    res.json({ success: true, message: "Order status updated successfully", updatedOrder: order });
>>>>>>> a22aabe8579dd0b157150b77a46b9dbef0817d5d
  } catch (error) {
    console.error("❌ Error updating order status:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.use((err, req, res, next) => {
  console.error("❌ Internal Server Error:", err);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
