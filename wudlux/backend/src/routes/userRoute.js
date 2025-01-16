const express = require("express");
const router = express.Router();
const { registerUser, loginUser, refreshToken, forgotPassword } = require("../controllers/userController");

// Define Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);

module.exports = router;
