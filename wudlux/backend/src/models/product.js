const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false, // Optional; set to true if you want it mandatory
      trim: true,
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    variantImages: [
      {
        type: String,
        required: false,
      },
    ],
    
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    size: [
      {
        L: { type: String },
        B: { type: String },
        H: { type: String },
      },
    ],
    materials: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
