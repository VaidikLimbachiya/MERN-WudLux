const express = require("express");
const { createProduct, listProducts, removeProduct } = require("../controllers/productController");
const upload = require("../middlewares/upload"); // Import the multer configuration

const productRouter = express.Router();

// Routes
productRouter.post("/add", upload.single("image"), createProduct); // Route for creating a product with file upload
productRouter.get("/list", listProducts); // Route for fetching all products
productRouter.post("/remove", removeProduct); // Route for removing a product



module.exports = productRouter;
