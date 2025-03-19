// server.js
require('dotenv').config(); 
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

dotenv.config({ path: ".env" });
console.log("✅ Environment variables loaded.");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://mern-wud-lux-vaidik-limbachiyas-projects.vercel.app",
      "https://mern-wud-lux-7czr-lrpv3w5ai-vaidik-limbachiyas-projects.vercel.app",
      "https://mern-wud-lux-7czr-vaidik-limbachiyas-projects.vercel.app",
      "https://mern-wud-lux-7czr.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3001"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  }
});
app.set("io", io);


// ✅ Middleware Setup
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: [
    "https://mern-wud-lux-vaidik-limbachiyas-projects.vercel.app",
    "https://mern-wud-lux-7czr-lrpv3w5ai-vaidik-limbachiyas-projects.vercel.app",
    "https://mern-wud-lux-7czr-vaidik-limbachiyas-projects.vercel.app",
    "https://mern-wud-lux-7czr.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3001"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

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
app.use("/api/test", testEmailRoute);

// ✅ Refresh Token Route
app.post("/api/auth/refresh", (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }
  const decoded = (() => {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  })();
  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
  const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  res.json({ accessToken: newAccessToken });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Internal Server Error:", err.stack);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : "Something went wrong!",
  });
});

// ✅ Socket Events
io.on("connection", (socket) => {
  console.log("🔵 User connected:", socket.id);
  socket.on("disconnect", () => console.log("❌ User disconnected:", socket.id));
});

// ✅ Start Server
server.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
