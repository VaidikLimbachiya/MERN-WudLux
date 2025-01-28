const express = require("express");
const cartController = require("../controllers/cartController");
const { updateCart } = require("../controllers/cartController"); // Import the controller object
const authenticateToken = require("../middlewares/authMiddleware"); // Import the authentication middleware

const router = express.Router();

// Use individual methods from the controller
router.get("/", authenticateToken, cartController.getCart);
router.post("/add", authenticateToken, cartController.addToCart);
router.delete("/remove", authenticateToken, cartController.removeFromCart);
router.patch("/update", authenticateToken, updateCart);

module.exports = router;
