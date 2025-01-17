import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [productList, setProductList] = useState([]);

  // Fetch Product List
  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${url}/api/products`);
      if (response.status === 200 && response.data) {
        setProductList(response.data); // Assuming the response is an array of products
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error("Error fetching product list");
    }
  };

  // Remove Product
  const removeProduct = async (productId) => {
    try {
      const response = await axios.delete(`${url}/api/products/${productId}`);
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        fetchProductList(); // Refresh list after deletion
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
  }, [url]); // Re-fetch if the url changes

  return (
    <div className="list add flex-col">
      <h2>All Products</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Thumbnail</b>
          <b>Title</b>
          <b>Category</b>
          <b>Price</b>
          <b>Discount</b>
          <b>Actions</b>
        </div>
        {productList.map((product, index) => (
          <div key={index} className="list-table-format">
            {/* Product Image */}
            <img
              src={`${url}/images/${product.image}`}
              alt={product.title}
              className="product-thumbnail"
            />
            {/* Product Details */}
            <p>{product.title}</p>
            <p>{product.category}</p>
            <p>₹{product.price}</p>
            <p>{product.discount}%</p>
            {/* Action (Delete Button) */}
            <p onClick={() => removeProduct(product._id)} className="cursor delete-btn">
              Delete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

List.propTypes = {
  url: PropTypes.string.isRequired,
};

export default List;
