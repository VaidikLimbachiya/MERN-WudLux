const express = require("express");
const { 
  createProduct, 
  listProducts, 
  removeProduct, 
  listProductsByCategory // New controller function for filtering products
} = require("../controllers/productController");
const upload = require("../middlewares/upload"); // Import the multer configuration

const productRouter = express.Router();

// Routes
productRouter.post("/add", upload, createProduct); // Route for creating a product with file upload
productRouter.get("/list", listProducts); // Route for fetching all products
productRouter.post("/remove", removeProduct); // Route for removing a product

// New route for fetching products by category and subcategory
productRouter.get("/listByCategory", listProductsByCategory); 

module.exports = productRouter;
