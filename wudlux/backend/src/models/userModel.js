const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  address: {
    street: String,
    zipCode: String,
    country: String,
    state: String,
    city: String,
  },
  phoneNumber: { type: String },
  resetToken: { type: String, default: null },
  tokenExpiration: { type: Date, default: null },
},{ timestamps: true });

module.exports = mongoose.model("User", userSchema);
