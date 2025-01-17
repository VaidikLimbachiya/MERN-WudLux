import  { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [productList, setProductList] = useState([]);

  // Fetch Product List
  const fetchProductList = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/product/`);
      if (response.data.success) {
        setProductList(response.data.data);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error("Error fetching product list");
    }
  }, [url]);

  // Remove Product
  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/product/remove`, { id: productId });
      if (response.data.success) {
        toast.success(response.data.message);
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
  }, [fetchProductList]);

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

