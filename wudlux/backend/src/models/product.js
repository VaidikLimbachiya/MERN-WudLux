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
    image: {
      type: String,
      required: true,
    },
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
        type: String,
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

const product = mongoose.model("Product", productSchema);

module.exports = product;
