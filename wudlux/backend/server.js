const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const addressRoutes = require("./src/routes/addressRoutes");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json()); // For parsing application/json
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Request logging

// Enable CORS for all routes
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"], // Allow these origins
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allow these methods
  allowedHeaders: ["Content-Type","Authorization"],
};
app.use(cors(corsOptions)); // Apply CORS globally to all routes

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(uploadDir));

// Register routes
app.use("/api/auth", authRoutes);
const jwt = require("jsonwebtoken");

app.use("/addresses", addressRoutes);
const isValidRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return decoded;
  } catch (err) {
    if (!decoded) {
      return res.status(401).json({ error: "Refresh token expired or invalid." });
    }    
    return null;
  }
};

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};


app.post("/api/auth/refresh", (req, res) => {
  const { refreshToken } = req.body;

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



app.use("/api/cart", cartRoutes);

app.use((err, req, res, next) => {
  console.error("Error in forgotPassword:", err);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

app.use("/api/products", productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
