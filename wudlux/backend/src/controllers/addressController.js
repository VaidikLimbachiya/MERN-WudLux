const User = require("../models/userModel");


// Get user details along with addresses
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("firstName lastName email phoneNumber addresses");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get the user's address
exports.getUserAddresses = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).select("addresses");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user.addresses || []);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving addresses", error });
    }
  };
  
  exports.addUserAddress = async (req, res) => {
    try {
      const { street, city, state, zipCode, country, isDefault } = req.body;
      const user = await User.findById(req.params.userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // If this address is set as default, remove default from other addresses
      if (isDefault) {
        user.addresses.forEach((addr) => (addr.isDefault = false));
      }
  
      user.addresses.push({ street, city, state, zipCode, country, isDefault });
      await user.save();
  
      res.json({ message: "Address added successfully", addresses: user.addresses });
    } catch (error) {
      res.status(500).json({ message: "Error adding address", error });
    }
  };
    

// Update or Add address to User
exports.updateUserAddress = async (req, res) => {
    try {
      const { street, city, state, zipCode, country, isDefault } = req.body;
      const user = await User.findById(req.params.userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const address = user.addresses.id(req.params.addressId);
      if (!address) {
        return res.status(404).json({ message: "Address not found" });
      }
  
      // If the updated address is set as default, remove default from others
      if (isDefault) {
        user.addresses.forEach((addr) => (addr.isDefault = false));
      }
  
      address.street = street;
      address.city = city;
      address.state = state;
      address.zipCode = zipCode;
      address.country = country;
      address.isDefault = isDefault;
  
      await user.save();
      res.json({ message: "Address updated successfully", addresses: user.addresses });
    } catch (error) {
      res.status(500).json({ message: "Error updating address", error });
    }
  };
  exports.deleteUserAddress = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.addresses = user.addresses.filter((addr) => addr._id.toString() !== req.params.addressId);
      await user.save();
  
      res.json({ message: "Address deleted successfully", addresses: user.addresses });
    } catch (error) {
      res.status(500).json({ message: "Error deleting address", error });
    }
  };
    
  exports.setDefaultAddress = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const address = user.addresses.id(req.params.addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        // Remove default from all addresses and set only the selected one as default
        user.addresses.forEach((addr) => (addr.isDefault = false));
        address.isDefault = true;

        await user.save();
        res.json({ message: "Default address set successfully", addresses: user.addresses });
    } catch (error) {
        res.status(500).json({ message: "Error setting default address", error });
    }
};
