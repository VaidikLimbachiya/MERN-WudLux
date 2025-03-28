const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  getUsers
} = require("../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword); // Forgot password route
router.post("/reset-password", resetPassword); // Reset password route
router.post("/verify-email", verifyEmail);

// Users route (without authentication)
router.get("/users", getUsers);

module.exports = router;

