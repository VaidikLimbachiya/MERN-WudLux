const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail
} = require("../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword); // Forgot password route
router.post("/reset-password", resetPassword); // Reset password route
router.post("/verify-email", verifyEmail);


module.exports = router;

