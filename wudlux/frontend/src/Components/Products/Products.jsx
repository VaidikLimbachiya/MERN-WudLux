import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useCartContext } from "../../Context/CartContext";
// import Filter from "../Filter/Filter"; // Import the Filter component
import "./Products.css";
import bagIcon from "../../assets/bag.png"; // Ensure the path is correct

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCartContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // State for filtering and sorting
  const [selectedMaterial] = useState("");
  const [priceRange] = useState({ min: "", max: "" });
  const [sortOption] = useState("Latest");

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

  // Apply Filtering
  const filteredProducts = products.filter((product) => {
    const matchesMaterial =
      selectedMaterial === "" || product.material === selectedMaterial;

    const matchesPrice =
      (!priceRange.min || product.price >= Number(priceRange.min)) &&
      (!priceRange.max || product.price <= Number(priceRange.max));

    return matchesMaterial && matchesPrice;
  });

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "atoz":
        return a.title.localeCompare(b.title);
      case "ztoa":
        return b.title.localeCompare(a.title);
      case "Price-low-to-High":
        return a.price - b.price;
      case "Price-High-to-Low":
        return b.price - a.price;
      case "old-to-new":
      case "new-to-old":
        return 0; // Placeholder for sorting by date if available
      default:
        return 0;
    }
  });

  const displayedProducts = showAll ? sortedProducts : sortedProducts.slice(0, 8);

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
              onClick={() => {
                window.scrollTo(0, 0); // Scroll to top before navigating
                navigate(`/product-info/${product._id}`, { state: { product } });
              }}              
            >
              <div className="productImageWrapper">
                <img
                  className="productImage"
                  crossOrigin="anonymous"
                  src={`http://localhost:5000/uploads/${Array.isArray(product.images) ? product.images[0] : product.images}`}
                  alt={product.title}
                  loading="lazy"
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
                    Add to Bag <img src={bagIcon} alt="Bag Icon" className="bagIcon" loading="lazy"/>
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
