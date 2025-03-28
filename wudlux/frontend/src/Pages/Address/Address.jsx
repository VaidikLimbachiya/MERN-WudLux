import { useState, useEffect } from "react";
import axios from "axios";
import "./Address.css";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
const API_BASE_URL = "https://mern-wudlux-1-lss8.onrender.com/addresses";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const AddressList = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    isDefault: false,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    if (!user?.id) return;

    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${user.id}`);
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [user?.id]);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setEditingAddressId(null);
    setNewAddress({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      isDefault: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddNew = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${user.id}`,
        newAddress
      );

      if (response.data) {
        setAddresses((prev) => [...prev, response.data]);
        toggleAddForm();
        fetchAddresses();
      } else {
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${user.id}`);
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
    }
  }, [user?.id]);

  const toggleEdit = (address) => {
    setEditingAddressId(address._id);
    setShowAddForm(true);
    setNewAddress({
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${user.id}/${editingAddressId}`,
        newAddress
      );

      if (response.data) {
        setAddresses((prev) =>
          prev.map((addr) =>
            addr._id === editingAddressId ? response.data : addr
          )
        );
        setEditingAddressId(null);
        toggleAddForm();
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleRemove = async (addressId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${user.id}/${addressId}`);
      setAddresses(addresses.filter((addr) => addr._id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      await axios.patch(`${API_BASE_URL}/${user.id}/${addressId}/default`);
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault: addr._id === addressId,
      }));
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="address-container">
        <div className="address-header">
          <h2>Addresses</h2>
          <button className="add-address-button" onClick={toggleAddForm}>
            {showAddForm ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <BsArrowLeft style={{ marginRight: "6px" }} />
                Back
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                Add a new address
                <BsArrowRight style={{ marginLeft: "6px" }} />
              </div>
            )}
          </button>
        </div>
        {showAddForm || editingAddressId ? (
          <form
            className="address-form"
            onSubmit={editingAddressId ? handleSaveEdit : handleAddNew}
          >
            <h2>{editingAddressId ? "Edit Address" : "Add a new address"}</h2>
            <div className="form-group">
              <input
                type="text"
                name="street"
                placeholder="Street Address *"
                value={newAddress.street}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City *"
                value={newAddress.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="state"
                placeholder="State *"
                value={newAddress.state}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code *"
                value={newAddress.zipCode}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="country"
                value={newAddress.country}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={newAddress.isDefault}
                  onChange={handleInputChange}
                />
                <span className="dfText">Use this address as default</span>
              </label>
            </div>
            <button className="update-button" type="submit">
              {editingAddressId ? "Update Address" : "Save →"}
            </button>
          </form>
        ) : (
          <div className="address-list">
            {loading ? (
              <p>Loading addresses...</p>
            ) : addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address._id} className="address-card">
                  {address.isDefault && (
                    <span className="default-badge">Default</span>
                  )}
                  <div className="user-info">
                    <h3>
                      {user?.firstName} {user?.lastName}
                    </h3>
                  </div>
                  <div className="address-info">
                    <p className="address-details">{`${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zipCode}`}</p>
                  </div>
                  <div className="address-actions">
                    <button
                      className="edit-button"
                      onClick={() => toggleEdit(address._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(address._id)}
                    >
                      Remove
                    </button>
                    {!address.isDefault && (
                      <button
                        className="set-default-button"
                        onClick={() => handleSetDefault(address._id)}
                      >
                        Set Default
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
    </>
  );
};

export default AddressList;
