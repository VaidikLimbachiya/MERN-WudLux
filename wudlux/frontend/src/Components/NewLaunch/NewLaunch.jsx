import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewLaunch.css";
import arr from "../../assets/arr.png"; // Ensure correct path
import { BsArrowRight } from "react-icons/bs";

const NewLaunch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // State to toggle product display
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/list/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        if (result.success) {
          setProducts(result.data); // Store all products
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
    <div className="newLaunchSection">
      <div className="newLaunchHeader">
        <h2 className="newLaunchTitle">
          Newly Launched
          <div className="newLaunchTitleUnderline"></div>
        </h2>
        <p className="newLaunchSubtitle">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est...
        </p>
      </div>

      <div className="newLaunchGrid">
        {loading ? (
          <div className="newLaunchLoading">Loading products...</div>
        ) : error ? (
          <div className="newLaunchError">⚠️ Error: {error}</div>
        ) : products.length > 0 ? (
          products
            .slice(0, showAll ? products.length : 4) // Show 4 initially, then all
            .map((product, index) => (
              <div
                className="newLaunchCard"
                key={product.id || index}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/product-info/${product._id}`, {
                    state: { product },
                  });
                }}
              >
                <div className="newLaunchImageWrapper">
                  <img
                    className="newLaunchImage"
                    crossOrigin="anonymous"
                    src={`http://localhost:5000/uploads/${
                      Array.isArray(product.images) ? product.images[0] : product.images
                    }`}
                    alt={product.title}
                    loading="lazy"
                  />
                  {product.discount > 0 && (
                    <div className="newLaunchDiscountBadge">{product.discount}% OFF</div>
                  )}
                </div>
                <div className="newLaunchDetails">
                  {/* <p className="newLaunchProductTitle">{product.title}</p> */}
                  <p className="newLaunchProductDesc">{product.description}</p>
                  <div className="newLaunchPrice">
                    <span className="newLaunchCurrentPrice">₹{product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="newLaunchOriginalPrice">₹{product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div>No products available</div>
        )}
      </div>

      {/* View All Button */}
      {products.length > 4 && (
        <button className="newLaunchViewAll" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All"}
          <span className="arr">
            {/* <img src={arr} alt="Arrow Icon" /> */}
            <BsArrowRight className="rightarr"/> 
          </span>
        </button>
      )}
    </div>
  );
};

export default NewLaunch;
