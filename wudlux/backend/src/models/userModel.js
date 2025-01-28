const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    address: {
      street: { type: String },
      zipCode: { type: String },
      country: { type: String },
      state: { type: String },
      city: { type: String },
    },
    phoneNumber: { type: String },
    resetToken: { type: String, default: null },
    tokenExpiration: { type: Date, default: null },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
