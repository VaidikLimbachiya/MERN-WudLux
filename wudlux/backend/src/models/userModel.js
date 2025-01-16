const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    street: String,
    zipCode: String,
    country: String,
    state: String,
    city: String,
  },
  phoneNumber: { type: String },
});

module.exports = mongoose.model("User", userSchema);
