  const userModel = require("../models/userModel");
  const productModel = require("../models/product");

  // Add to Cart
  exports.addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;

      if (!productId || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Valid product ID and quantity are required.",
        });
      }

      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found." });
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      const existingItem = user.cart.find((item) => item.productId.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }

      await user.save();

      const updatedUser = await userModel.findById(userId).populate("cart.productId", "title price images category size");

      const formattedCart = updatedUser.cart.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        category: item.productId.category || "No category",
        size: item.productId.size || [],
        price: item.productId.price,
        images: item.productId.images,
        quantity: item.quantity,
      }));

      res.json({
        success: true,
        message: "Item added to cart successfully.",
        cart: formattedCart,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };

  // Remove from Cart
  exports.removeFromCart = async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user.id;

      if (!productId) {
        return res.status(400).json({ success: false, message: "Product ID is required." });
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
      await user.save();

      const updatedUser = await userModel.findById(userId).populate("cart.productId", "title price images category size");

      const formattedCart = updatedUser.cart.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        category: item.productId.category || "No category",
        size: item.productId.size || [],
        price: item.productId.price,
        images: item.productId.images,
        quantity: item.quantity,
      }));

      res.json({
        success: true,
        message: "Item removed from cart successfully.",
        cart: formattedCart,
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };

  // Get Cart
  exports.getCart = async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await userModel.findById(userId).populate("cart.productId", "title price images category size");

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const formattedCart = user.cart.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        category: item.productId.category || "No category",
        size: item.productId.size || [],
        price: item.productId.price,
        images: item.productId.images,
        quantity: item.quantity,
      }));

      return res.status(200).json({ success: true, cartItems: formattedCart });
    } catch (error) {
      console.error("Error fetching cart:", error);
      return res.status(500).json({ success: false, message: "An error occurred while fetching the cart" });
    }
  };

  // Update Cart
  exports.updateCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;

      if (!productId || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ success: false, message: "Valid product ID and quantity are required." });
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      const existingItem = user.cart.find((item) => item.productId.toString() === productId);
      if (!existingItem) {
        return res.status(400).json({ success: false, message: "Item not found in cart." });
      }

      existingItem.quantity = quantity;
      await user.save();

      const updatedUser = await userModel.findById(userId).populate("cart.productId", "title price images category size");

      const formattedCart = updatedUser.cart.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        category: item.productId.category || "No category",
        size: item.productId.size || [],
        price: item.productId.price,
        images: item.productId.images,
        quantity: item.quantity,
      }));

      res.json({
        success: true,
        message: "Cart updated successfully.",
        cartItems: formattedCart,
      });
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
// Clear Cart for User
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    user.cart = []; // Clear the cart array
    await user.save();

    return res.status(200).json({ success: true, message: "Cart cleared successfully." });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
