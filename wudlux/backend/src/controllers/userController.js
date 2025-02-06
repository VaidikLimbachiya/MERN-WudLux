const User = require("../models/userModel");

// ✅ Get user profile including addresses
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("firstName lastName email phoneNumber addresses");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
