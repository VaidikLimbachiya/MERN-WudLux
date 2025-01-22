const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Ensure this matches the directory being served
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Ensure unique filenames
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 20 }, // 2MB limit
  fileFilter,
});

module.exports = upload;
