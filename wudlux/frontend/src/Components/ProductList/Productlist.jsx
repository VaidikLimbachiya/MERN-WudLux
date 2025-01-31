import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Productlist.css";
import bagIcon from "../../assets/bag.png";
import { useCartContext } from "../../Context/CartContext";


const Productlist = () => {
  const { addToCart, cartItems = [] } = useCartContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Get category and subcategory from query params
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const subcategory = queryParams.get("subcategory");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = "http://localhost:5000/api/products/listByCategory"; // Initial URL

        // Add query parameters for category and subcategory
        const params = [];
        if (category) params.push(`category=${category}`);
        if (subcategory) params.push(`subcategory=${subcategory}`);

        if (params.length > 0) {
          url += `?${params.join("&")}`; // Append query parameters
        }

        console.log("Fetching products from URL:", url); // Debugging line to check URL

        const response = await fetch(url);
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
  }, [category, subcategory]); // Refetch when category or subcategory changes

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
            onClick={() => navigate(`/product-info/${product._id}`, { state: { product } })}
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
                    addToCart(product); // Add product to the cart
                  }}
                >
                  <img
                    src={bagIcon}
                    alt="Bag Icon"
                    className="shop-product-list-bag-icon"
                  />
                  {cartItems.find((item) => item._id === product._id)
                    ? "Add to Bag"
                    : "Add to Bag"}
                </button>
              </div>
            </div>
            <div className="shop-product-list-details">
              <p className="shop-product-list-title">{product.title}</p>
              <p className="shop-product-list-desc">{product.description}</p>
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
