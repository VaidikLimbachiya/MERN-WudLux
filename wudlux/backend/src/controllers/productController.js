const Product = require("../models/product");
const { v2: cloudinary } = require("cloudinary");

// CREATE PRODUCT
module.exports.createProduct = async (req, res) => {
  const image_data = req.files?.images
    ? req.files.images.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }))
    : [];

  const variant_image_data = req.files?.variantImages
    ? req.files.variantImages.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }))
    : [];

  let size = req.body.size;
  if (typeof size === "string") {
    size = JSON.parse(size);
  }

  const materials = req.body.materials;
  const parsedMaterials =
    typeof materials === "string" ? JSON.parse(materials) : materials;

  const newProduct = new Product({
    category: req.body.category,
    subcategory: req.body.subcategory,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    originalPrice: req.body.originalPrice,
    discount: req.body.discount,
    size: size,
    materials: parsedMaterials,
    images: image_data,
    variantImages: variant_image_data,
  });

  try {
    await newProduct.save();
    res.json({ success: true, message: "Product created successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error creating product" });
  }
};

// GET ALL PRODUCTS
module.exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching products" });
  }
};

// GET PRODUCT BY ID
module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// REMOVE PRODUCT + DELETE FROM CLOUDINARY
module.exports.removeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // Delete main images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    // Delete variant images from Cloudinary
    if (product.variantImages && product.variantImages.length > 0) {
      for (const image of product.variantImages) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    await Product.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product and images removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing product" });
  }
};

// FILTER PRODUCTS
module.exports.listProductsByCategory = async (req, res) => {
  try {
    const { category, subcategory } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (subcategory)
      filter.subcategory = { $regex: new RegExp(subcategory, "i") };

    const products = await Product.find(filter);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};
