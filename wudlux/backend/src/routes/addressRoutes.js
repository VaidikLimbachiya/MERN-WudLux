const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const userController = require("../controllers/userController"); // ✅ Import userController
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, userController.getUserData); // ✅ Fix: Reference userController
router.get("/:userId", addressController.getUserAddresses); 
router.post("/:userId", addressController.addUserAddress);
router.put("/:userId/:addressId", addressController.updateUserAddress);
router.delete("/:userId/:addressId", addressController.deleteUserAddress);
router.patch("/:userId/:addressId/default", addressController.setDefaultAddress);

module.exports = router;
