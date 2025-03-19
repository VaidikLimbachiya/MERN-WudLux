// src/middleware/upload.js

const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Cloudinary Storage config (auto handles folders + formats)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'wudlux/products';
    if (file.fieldname === 'variantImages') {
      folder = 'wudlux/variants';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
      transformation: [{ quality: "auto" }]
    };
  }
});

// ✅ Optional file filter (you can still restrict types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."));
  }
};

// ✅ Multer instance with Cloudinary storage (for multiple fields)
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 20 }, // 20MB max per file
  fileFilter,
}).fields([
  { name: "images", maxCount: 10 },
  { name: "variantImages", maxCount: 10 },
]);

module.exports = upload;
