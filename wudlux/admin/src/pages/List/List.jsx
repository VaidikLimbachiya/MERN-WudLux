import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";

const List = ({ url }) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false); // For data loading state

  // Fetch Product List
  const fetchProductList = async () => {
    setLoadingData(true);
    try {
      const response = await axios.get(`${url}/api/products/list`);
      if (response.status === 200 && Array.isArray(response.data.data)) {
        setProductList(response.data.data);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error("Error fetching product list");
    } finally {
      setLoadingData(false);
    }
  };

  // Remove Product
  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/products/remove`, { id: productId });
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        fetchProductList();
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      toast.error("Error removing product");
    }
  };

  // Fetch product list on mount
  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className="list-container">
      <h2>All Products</h2>
      {loadingData ? (
        <div className="loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading Products...</p>
          </div>
        </div>
      ) : (
        <div className="list-table">
          <div className="list-table-header">
            <b>Thumbnail</b>
            <b>Title</b>
            <b>Category</b>
            <b>Price</b>
            <b>Original Price</b>
            <b>Discount</b>
            <b>Actions</b>
          </div>
          {productList.length > 0 ? (
            productList.map((product) => (
              <div key={product._id} className="list-table-row">
                <img
                  crossOrigin="anonymous"
                  src={
                    product.image
                      ? `http://localhost:5000/uploads/${product.image}`
                      : product.variantImages && product.variantImages[0]
                      ? `http://localhost:5000/uploads/${product.variantImages[0]}`
                      : "https://via.placeholder.com/150" // Placeholder if no image available
                  }
                  alt={product.title}
                />
                <p>{product.title}</p>
                <p>{product.category}</p>
                <p>₹{product.price}</p>
                <p>{product.originalPrice}</p>
                <p>{product.discount}%</p>
                <div className="actions">
                  <button onClick={() => removeProduct(product._id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">
              <p>No products available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

List.propTypes = {
  url: PropTypes.string.isRequired,
};

export default List;
