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

  // Get filters from URL params
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const subcategory = queryParams.get("subcategory");
  const material = queryParams.get("material");
  const minPrice = queryParams.get("minPrice");
  const maxPrice = queryParams.get("maxPrice");
  const sortOption = queryParams.get("sortOption") || "Latest";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Build API URL with filters
        let url = "http://localhost:5000/api/products/listByCategory";
        const params = [];

        if (category) params.push(`category=${category}`);
        if (subcategory) params.push(`subcategory=${subcategory}`);
        if (material) params.push(`material=${encodeURIComponent(material)}`);
        if (minPrice) params.push(`minPrice=${minPrice}`);
        if (maxPrice) params.push(`maxPrice=${maxPrice}`);
        if (sortOption) params.push(`sortOption=${sortOption}`);

        if (params.length > 0) {
          url += `?${params.join("&")}`;
        }

        const response = await fetch(url);
        if (!response.ok)
          throw new Error(
            `Failed to fetch products. Status: ${response.status}`
          );

        const result = await response.json();
        if (result.success) {
          let filteredProducts = result.data;

          // ✅ Fix: Ensure Material Filtering Works (Check inside materials array)
          if (material) {
            filteredProducts = filteredProducts.filter(
              (product) =>
                product.materials &&
                product.materials.some(
                  (mat) => mat.toLowerCase() === material.toLowerCase()
                )
            );
          }

          setProducts(filteredProducts);
        } else {
          throw new Error(result.message || "Failed to fetch products");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory, material, minPrice, maxPrice, sortOption]);

  return (
    <div className="shop-product-list-grid">
      {loading ? (
        <div className="loadingSpinner">Loading products...</div>
      ) : error ? (
        <div className="errorMessage">⚠️ {error}</div>
      ) : products.length > 0 ? (
        products.map((product) => {
          const isInCart = cartItems.some((item) => item._id === product._id);

          return (
            <div
              className="shop-product-list-card"
              key={product._id}
              onClick={() =>
                navigate(`/product-info/${product._id}`, { state: { product } })
              }
            >
              <div className="shop-product-list-image-wrapper">
                <img
                  className="shop-product-list-image"
                  crossOrigin="anonymous"
                  src={`http://localhost:5000/uploads/${
                    Array.isArray(product.images)
                      ? product.images[0]
                      : product.images
                  }`}
                  alt={product.title}
                />
                {product.discount > 0 && (
                  <div className="shop-product-list-discount-badge">
                    {product.discount}% OFF
                  </div>
                )}
                <div className="shop-product-list-bag-button-wrapper">
                  <button
                    className="shop-product-list-bag-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <img
                      src={bagIcon}
                      alt="Bag Icon"
                      className="shop-product-list-bag-icon"
                    />
                    {isInCart ? "Added" : "Add to Bag"}
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
                  {product.originalPrice > product.price && (
                    <span className="shop-product-list-original-price">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="noProductsMessage">
          No products available in this category.
        </div>
      )}
    </div>
  );
};

export default Productlist;
