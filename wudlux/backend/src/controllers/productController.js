// productController.js
const Product = require("../models/product");
const fs = require("fs");

module.exports.createProduct = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  let size = req.body.size;

  // If size is a string, parse it as JSON
  if (typeof size === 'string') {
    size = JSON.parse(size);
  }

  const newProduct = new Product({
    category: req.body.category,
    subcategory: req.body.subcategory,
    title: req.body.title,
    price: req.body.price,
    originalPrice: req.body.originalPrice,
    discount: req.body.discount,
    size: size,
    materials: JSON.parse(req.body.materials),
    image: req.file.filename // Only save the filename
  });  

  try {
    await newProduct.save();
    res.json({ success: true, message: "Product created successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error creating product" });
  }
};



// Get all products
module.exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching products" });
  }
};



// Remove a product
module.exports.removeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    
    // Check if the product exists
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    
    // If the product has an image, remove it from the file system
    if (product.image) {
      fs.unlink(`uploads/${product.image}`, (err) => {
        if (err) console.log("Error deleting image", err);
      });
    }

    await Product.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing product" });
  }
};
