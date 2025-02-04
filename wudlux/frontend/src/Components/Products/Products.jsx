import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useCartContext } from "../../Context/CartContext";
import "./Products.css";
import bagIcon from "../../assets/bag.png"; // Ensure the path is correct

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCartContext();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showAll, setShowAll] = useState(false); // State for "View All"
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/list/"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json(); // Parse JSON response
        if (result.success) {
          setProducts(result.data); // Populate products state with fetched data
        } else {
          throw new Error("Failed to fetch products: " + result.message);
        }
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchProducts(); // Trigger product fetching on component mount
  }, []);

  const displayedProducts = showAll ? products : products.slice(0, 8);

  return (
    <div className="productsSection">
      {/* Header Section */}
      <div className="productsHeader">
        <h2 className="productsTitle">
          Newly Launched
          <div className="titleUnderline"></div>
        </h2>
        <p className="productsSubtitle">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est...
        </p>
      </div>

      {/* Product Grid */}
      <div className="productsGrid">
        {loading ? (
          <div className="loadingSpinner">Loading products...</div>
        ) : error ? (
          <div className="errorMessage">⚠️ Error: {error}</div>
        ) : displayedProducts.length > 0 ? (
          displayedProducts.map((product, index) => (
            <div
              className="productCard"
              key={product.id || index}
              onClick={() => navigate(`/product-info/${product._id}`, { state: { product } })}
            >
              <div className="productImageWrapper">
                <img
                  className="productImage"
                  crossOrigin="anonymous"
                  src={`http://localhost:5000/uploads/${Array.isArray(product.images) ? product.images[0] : product.images}`}
                  alt={product.title}
                />
                {product.discount > 0 && (
                  <div className="discountBadge">{product.discount}% OFF</div>
                )}
                <div className="addToBagWrapper">
                  <button
                    className="addToBagButton"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation when clicking "Add to Bag"
                      addToCart({ ...product, quantity: 1 }); // Pass full product details
                    }}
                  >
                    Add to Bag <img src={bagIcon} alt="Bag Icon" className="bagIcon" />
                  </button>
                </div>
              </div>
              <div className="productDetails">
                <p className="shop-product-list-title">{product.title}</p>
                <p className="shop-product-list-desc">{product.description}</p>
                <div className="productPrice">
                  <span className="currentPrice">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice > product.price && (
                    <span className="originalPrice">
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

      {/* View All / Show Less Button */}
      <div className="viewAllButtonWrapper">
        <button className="viewAllButton" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less ↑" : "View All →"}
        </button>
      </div>
    </div>
  );
};

export default Products;
