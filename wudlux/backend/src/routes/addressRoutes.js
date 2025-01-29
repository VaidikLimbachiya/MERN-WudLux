const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.get("/:userId", addressController.getUserAddresses); // Get all addresses
router.post("/:userId", addressController.addUserAddress); // Add new address
router.put("/:userId/:addressId", addressController.updateUserAddress); // Update specific address
router.delete("/:userId/:addressId", addressController.deleteUserAddress); // Delete specific address
router.patch("/:userId/:addressId/default", addressController.setDefaultAddress);

module.exports = router;
