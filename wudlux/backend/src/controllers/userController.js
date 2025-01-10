const User = require("../models/userModel");
const { registerValidation } = require("../validation");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  // Validate the request body
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).send({ message: "Email already in use" });

    // Create a new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });

    // Save the user to the database
    const savedUser = await user.save();
    res.status(201).send({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
};
