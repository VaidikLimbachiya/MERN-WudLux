import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";

const List = ({ url }) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Product List
  const fetchProductList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/products/list`);
      if (response.status === 200 && Array.isArray(response.data.data)) {
        setProductList(response.data.data);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error("Error fetching product list. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Remove Product
  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/products/remove`, { id: productId });
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        fetchProductList(); // Refresh list after deletion
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      toast.error("Error removing product. Please try again.");
    }
  };

  // Fetch product list on mount
  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  return (
    <div className="list-container">
      <h2 className="name">All Products</h2>

      {loading ? (
        <div className="loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p className="name">Loading Products...</p>
          </div>
        </div>
      ) : productList.length > 0 ? (
        <div className="list-table">
          <div className="list-table-header">
            <b className="name">Thumbnail</b>
            <b className="titlename">Title</b>
            <b className="name">Category</b>
            <b className="name">Price</b>
            <b className="name">Original Price</b>
            <b className="name">Discount</b>
            <b className="name">Actions</b>
          </div>
          {productList.map((product) => (
  <div key={product._id} className="list-table-row">
    <img
      crossOrigin="anonymous"
      src={
        product.image?.url
          ? product.image.url
          : product.variantImages?.[0]?.url
          ? product.variantImages[0].url
          : "https://via.placeholder.com/150"
      }
      alt={product.title}
    />
    <p className="name">{product.title}</p>
    <p className="name">{product.category}</p>
    <p className="name">₹{product.price}</p>
    <p className="name">₹{product.originalPrice}</p>
    <p className="name">{product.discount}%</p>
    <div className="actions">
      <button onClick={() => removeProduct(product._id)} className="delete-btn">
        Delete
      </button>
    </div>
  </div>
))}

        </div>
      ) : (
        <div className="empty">
          <p>No products found. Add some to get started!</p>
        </div>
      )}
    </div>
  );
};

List.propTypes = {
  url: PropTypes.string.isRequired,
};

export default List;
