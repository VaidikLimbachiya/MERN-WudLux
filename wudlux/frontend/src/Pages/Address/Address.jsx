import { useState } from "react";
import "./Address.css";
import breadcrumbIcon from "../../assets/home.png"; // Update the path to your breadcrumb icon

const initialAddresses = [
  {
    id: 1,
    name: "Meghna Sheth",
    email: "meghna_sheth@gmail.com",
    address: "J-305, Krishna road, Opp. HDFC bank, Ahmedabad, Gujarat, India",
    zipCode: "360006",
    country: "India",
    state: "Gujarat",
    city: "Ahmedabad",
    phone: "9632587412",
    isDefault: true,
  },
  {
    id: 2,
    name: "Ramesh Vora",
    email: "ramesh_vora@gmail.com",
    address: "1205, Ramol Road, Opp. ICICI bank, Ahmedabad, Gujarat",
    zipCode: "360007",
    country: "India",
    state: "Gujarat",
    city: "Ahmedabad",
    phone: "9876543210",
    isDefault: false,
  },
];

const AddressList = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNew = () => {
    setIsAdding(true);
    setIsEditing(false);
    setCurrentAddress(null);
  };

  const handleEdit = (address) => {
    setIsEditing(true);
    setIsAdding(false);
    setCurrentAddress(address);
  };

  const handleRemove = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAddress = {
      id: currentAddress ? currentAddress.id : addresses.length + 1,
      name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email"),
      address: formData.get("address"),
      zipCode: formData.get("zipCode"),
      country: formData.get("country"),
      state: formData.get("state"),
      city: formData.get("city"),
      phone: formData.get("phone"),
      isDefault: formData.get("isDefault") === "on",
    };

    if (currentAddress) {
      setAddresses(
        addresses.map((address) =>
          address.id === currentAddress.id ? newAddress : address
        )
      );
    } else {
      setAddresses([...addresses, newAddress]);
    }

    setIsAdding(false);
    setIsEditing(false);
    setCurrentAddress(null);
  };

  return (
    <div className="address-container">
      {/* Breadcrumb Section */}
      <div className="breadcrumb">
        <img src={breadcrumbIcon} alt="Breadcrumb" />
        <h2 className="btext">{'>'} Addresses</h2>
      </div>

      {/* Address Header */}
      <div className="address-header">
        <h2>Addresses</h2>
        <button className="add-address-button" onClick={handleAddNew}>
          Add a new address →
        </button>
      </div>

      {/* Form Section */}
      {isAdding || isEditing ? (
        <form className="address-form" onSubmit={handleFormSubmit}>
          <h2>{isEditing ? "" : "Add a new address"}</h2>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              defaultValue={currentAddress?.name.split(" ")[0] || ""}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              defaultValue={currentAddress?.name.split(" ")[1] || ""}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            className="email-input"
            placeholder="Email Address *"
            defaultValue={currentAddress?.email || ""}
            required
          />
          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Your Address *"
              defaultValue={currentAddress?.address || ""}
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code *"
              defaultValue={currentAddress?.zipCode || ""}
              required
            />
          </div>
          <div className="form-group">
            <select name="country" defaultValue={currentAddress?.country || ""}>
              <option value="India">India</option>
            </select>
            <select name="state" defaultValue={currentAddress?.state || ""}>
              <option value="Gujarat">Gujarat</option>
            </select>
            <select name="city" defaultValue={currentAddress?.city || ""}>
              <option value="Ahmedabad">Ahmedabad</option>
            </select>
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number *"
            defaultValue={currentAddress?.phone || ""}
            required
          />
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isDefault"
                className="custom-checkbox"
                defaultChecked={currentAddress?.isDefault || false}
              />
              <span className="dfText">Use this address as default</span>
            </label>
          </div>
          <button type="submit" className="update-button">
            {isEditing ? "Update" : "Add"} →
          </button>
        </form>
      ) : (
        <div className="address-list">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address.id} className="address-card">
                <div className="address-info">
                  <div className="address-name">
                    {address.name}
                    {address.isDefault && (
                      <span className="default-badge">Default</span>
                    )}
                  </div>
                  <div className="address-details">{address.address}</div>
                </div>
                <div className="address-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(address)}
                  >
                    Edit
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(address.id)}
                  >
                    Remove
                  </button>
                  {!address.isDefault && (
                    <button
                      className="set-default-button"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as default
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-address">No address yet!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressList;
