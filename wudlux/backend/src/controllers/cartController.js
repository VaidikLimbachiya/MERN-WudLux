const userModel = require("../models/userModel");

// Add items to user cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !Number.isInteger(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Valid product ID and quantity are required.",
        });
    }

    const userId = req.user.id; // Use authenticated user's ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Check if the product already exists in the cart
    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.json({
      success: true,
      message: "Item added to cart successfully.",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Remove items from user cart
exports.removeFromCart = async (req, res) => {
  try {
    console.log("Request Body in removeFromCart:", req.body);

    const { productId } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required." });
    }

    const userId = req.user.id; // Use authenticated user's ID
    console.log("Authenticated User ID:", userId);

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingItem) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found in cart." });
    }

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );
    await user.save();

    console.log("Cart after removal:", user.cart);

    res.json({
      success: true,
      message: "Item removed from cart successfully.",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get the authenticated user's ID

    // Find the user and populate cart products with required fields
    const user = await userModel.findById(userId).populate({
      path: "cart.productId",
      select: "title category size images price", //   Include category & size
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      cartItems: user.cart.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        category: item.productId.category || "No category", //   Now included
        size: item.productId.size || [], //   Now included
        price: item.productId.price,
        images: item.productId.images,
        quantity: item.quantity,
      })),
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the cart",
    });
  }
};

// Update item quantity in user cart
exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !Number.isInteger(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Valid product ID and quantity are required.",
        });
    }

    const userId = req.user.id; // Use authenticated user's ID
    const user = await userModel.findById(userId).populate("cart.productId"); // Populate product details

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Check if the product exists in the cart
    const existingItem = user.cart.find(
      (item) => item.productId._id.toString() === productId
    );

    if (!existingItem) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found in cart." });
    }

    // Update the quantity
    existingItem.quantity = quantity;

    await user.save();

    // Re-populate cart with updated product details
    const updatedUser = await userModel
      .findById(userId)
      .populate("cart.productId");

    res.json({
      success: true,
      message: "Cart updated successfully.",
      cartItems: updatedUser.cart.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        price: item.productId.price,
        images: item.productId.images,
        quantity: item.quantity,
      })),
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
