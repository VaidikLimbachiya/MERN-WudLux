const Product = require("../models/product");
const fs = require("fs");
const path = require("path"); // Make sure to require path module

module.exports.createProduct = async (req, res) => {
  const image_filenames = req.files?.images ? req.files.images.map((file) => file.filename) : [];
const variant_image_filenames = req.files?.variantImages ? req.files.variantImages.map((file) => file.filename) : [];

let size = req.body.size;
if (typeof size === "string") {
  size = JSON.parse(size);
}

const materials = req.body.materials;
const parsedMaterials = (typeof materials === "string") ? JSON.parse(materials) : materials;


  const newProduct = new Product({
    category: req.body.category,
    subcategory: req.body.subcategory,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    originalPrice: req.body.originalPrice,
    discount: req.body.discount,
    size: size,
    materials: JSON.parse(req.body.materials),
    images: image_filenames,
    variantImages: variant_image_filenames,
  });

  try {
    await newProduct.save();
    res.json({ success: true, message: "Product created successfully!" });
  } catch (error) {
    console.error(error);
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
module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

    // If the product has images, remove them from the file system
    if (product.images && product.images.length > 0) {
      product.images.forEach((image) => {
        const imagePath = path.join(__dirname, '..', 'uploads', image); // Adjusted path
        fs.unlink(imagePath, (err) => {
          if (err) console.log("Error deleting image", err);
        });
      });
    }

    // If the product has variantImages, remove them from the file system
    if (product.variantImages && product.variantImages.length > 0) {
      product.variantImages.forEach((image) => {
        const imagePath = path.join(__dirname, '..', 'uploads', image); // Adjusted path
        fs.unlink(imagePath, (err) => {
          if (err) console.log("Error deleting variant image", err);
        });
      });
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing product" });
  }
};

// Controller for fetching products by category and subcategory
module.exports.listProductsByCategory = async (req, res) => {
  try {
    const { category, subcategory } = req.query;
    const filter = {}; // Initialize filter object
    
    if (category) filter.category = category;
if (subcategory) filter.subcategory = { $regex: new RegExp(subcategory, "i") };  // Case-insensitive match

    console.log("Filter:", filter); // Debugging line to verify the filter

    const products = await Product.find(filter); // Find products based on filter
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
};

