import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Productlist.css";
import bagIcon from "../../assets/bag.png";
import { useCartContext } from "../../Context/CartContext";

const Productlist = () => {
  const { addToCart, cartItems = {} } = useCartContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/list");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        if (result.success) {
          setProducts(result.data);
        } else {
          throw new Error("Failed to fetch products: " + result.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="shop-product-list-grid">
      {error ? (
        <div>Error: {error}</div>
      ) : loading ? (
        <div>Loading products...</div>
      ) : Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div
            className="shop-product-list-card"
            key={product._id}
            onClick={() => navigate(`/product-info/${product._id}`)} // Navigate on click
          >
            <div className="shop-product-list-image-wrapper">
              <img
              className="shop-product-list-image"
                crossOrigin="anonymous"
                src={`http://localhost:5000/uploads/${product.images}`}
                alt={product.title}
              />
              {product.discount && (
                <div className="shop-product-list-discount-badge">
                  {product.discount}% OFF
                </div>
              )}
              <div className="shop-product-list-bag-button-wrapper">
                <button
                  className="shop-product-list-bag-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation on button click
                    addToCart(product);
                  }}
                >
                  <img
                    src={bagIcon}
                    alt="Bag Icon"
                    className="shop-product-list-bag-icon"
                  />
                  {cartItems.find((item) => item._id === product._id)
                    ? "In Bag"
                    : "Add to Bag"}
                </button>
              </div>
            </div>
            <div className="shop-product-list-details">
              <p className="shop-product-list-title">{product.title}</p>
              <p className="shop-product-list-title">{product.description}</p>
              <div className="shop-product-list-price-details">
                <span className="shop-product-list-current-price">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="shop-product-list-original-price">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
};

export default Productlist;
