const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Assuming you have a User model for your MongoDB
const crypto = require("crypto");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Ensure all fields (e.g., address and phoneNumber) are returned
    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          zipCode: user.address?.zipCode || "",
          country: user.address?.country || "",
        },
        phoneNumber: user.phoneNumber || "",
        role: user.role || "user",
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};


// Forgot password - No email sending
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Please provide an email address." });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "No account found with this email address. Please check and try again.",
      });
    }

    // Generate a secure reset token and hash it
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set the token and expiration time in the user's record
    user.resetToken = hashedToken;
    user.tokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Instead of sending an email, return the token to the user
    res.status(200).json({
      message: "Password reset token generated successfully. Use this token to reset your password.",
      resetToken,  // Send the reset token back to the client (this can be used for password reset)
    });

  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Reset password with token (direct password reset without email)
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;  // Now accepting token and password directly from the body

  try {
    // Validate input
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Hash the received token and find the user
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      tokenExpiration: { $gt: Date.now() }, // Ensure the token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Reset the user's password
    user.password = await bcrypt.hash(password, 10); // Hash the new password
    user.resetToken = null; // Clear the token
    user.tokenExpiration = null; // Clear the expiration
    await user.save();

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
