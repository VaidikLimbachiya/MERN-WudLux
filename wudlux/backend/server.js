const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
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
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
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
