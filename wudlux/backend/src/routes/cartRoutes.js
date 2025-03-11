const express = require("express");
const cartController = require("../controllers/cartController");
const { updateCart } = require("../controllers/cartController"); // Import the controller object
const authenticateToken = require("../middlewares/authMiddleware"); // Import the authentication middleware

const router = express.Router();

router.get("/", authenticateToken, cartController.getCart);
router.post("/add", authenticateToken, cartController.addToCart);
router.delete("/remove", authenticateToken, cartController.removeFromCart);
router.patch("/update", authenticateToken, updateCart);
router.post("/sync", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { cartItems } = req.body;
  
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "No items to sync" });
    }
  
    try {
      // Fetch user's cart from the database
      let userCart = await Cart.findOne({ user: userId });
  
      if (!userCart) {
        userCart = new Cart({ user: userId, items: [] });
      }
  
      // Merge items: Check if product already exists, update quantity; otherwise, add it
      cartItems.forEach(async (localItem) => {
        const product = await Product.findById(localItem.productId);
        if (!product) return;
  
        const existingItem = userCart.items.find((item) => item.productId.toString() === localItem.productId);
  
        if (existingItem) {
          existingItem.quantity += localItem.quantity; // Update quantity if product exists
        } else {
          userCart.items.push({
            productId: localItem.productId,
            quantity: localItem.quantity,
            title: product.title,
            price: product.price,
            images: product.images, // Ensure product image is stored
          });
        }
      });
  
      await userCart.save();
      res.status(200).json({ message: "Cart synced successfully", cart: userCart });
  
    } catch (error) {
      console.error("Error syncing cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
