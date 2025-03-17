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
const cookieParser = require("cookie-parser");
const compression = require("compression");

// ✅ Import Routes
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const addressRoutes = require("./src/routes/addressRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

// ✅ Import Models
const Order = require("./src/models/orderModel");

dotenv.config({ path: ".env" });
console.log("✅ Environment variables loaded.");

const app = express();
const server = http.createServer(app);

// ✅ Middleware Setup
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or specify your frontend domain
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


// ✅ Use Morgan for Logging in Development Mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ Optimized CORS Configuration
const corsOptions = {
  origin: ["https://mern-wud-jw11doolu-vaidik-limbachiyas-projects.vercel.app/", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization","Access-Control-Allow-Origin"],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ MongoDB Connection with Performance Logging
const startTime = Date.now();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log(`✅ MongoDB Connected in ${Date.now() - startTime}ms`)
  )
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ✅ Ensure Uploads Directory Exists Asynchronously
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdir(uploadDir, { recursive: true }, (err) => {
    if (err) console.error("❌ Error creating upload directory:", err.message);
  });
}
app.use("/uploads", express.static(uploadDir));

// ✅ Routes Setup
app.use("/api/auth", authRoutes);
app.use("/addresses", addressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Utility Functions for Authentication
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

// ✅ Refresh Token Route
app.post("/api/auth/refresh", (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    console.log("❌ Refresh token missing");
    return res.status(400).json({ error: "Refresh token is required" });
  }

  const decoded = isValidRefreshToken(refreshToken);
  if (!decoded) {
    console.log("❌ Invalid or expired refresh token");
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }

  const newAccessToken = generateAccessToken(decoded.id);
  res.json({ accessToken: newAccessToken });
});

// ✅ Order Status Update API with Socket.IO Notification
app.post("/api/order/status", async (req, res) => {
  const { orderId, status } = req.body;
  console.log("🟡 Updating Order:", { orderId, status });

  try {
    if (!orderId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId or status" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      console.error("❌ Order not found:", orderId);
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    io.emit("orderUpdated", { orderId, status });
    res.json({
      success: true,
      message: "✅ Order status updated successfully",
      updatedOrder: order,
    });
  } catch (error) {
    console.error("❌ Error updating order status:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Internal Server Error:", err.stack);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong!",
  });
});

// ✅ Start Server with Optimized Socket.IO
server.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);

  const io = new Server(server, {
    cors: {
      origin: [
        "https://mern-wud-jw11doolu-vaidik-limbachiyas-projects.vercel.app/",
        "http://localhost:5173",
        "http://localhost:5174"
      ],
      methods: ["GET", "POST"],
      credentials: true
    }
  });  
  
  io.on("connection", (socket) => {
    console.log("🔵 User connected:", socket.id);
    socket.on("disconnect", () =>
      console.log("❌ User disconnected:", socket.id)
    );
  });
});
