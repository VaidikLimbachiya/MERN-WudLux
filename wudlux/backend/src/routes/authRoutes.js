const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const router = express.Router();

// User registration route
router.post("/register", register);

// User login route
router.post("/login", login);

// Forgot password route - sends a password reset link to the user's email
router.post("/forgot-password", forgotPassword);

// Reset password route - used when the user provides the reset token to set a new password
router.post("/reset-password/:token", resetPassword);

module.exports = router;
