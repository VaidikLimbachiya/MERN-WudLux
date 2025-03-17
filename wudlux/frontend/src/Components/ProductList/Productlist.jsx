import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Productlist.css";
import bagIcon from "../../assets/bag.svg";
import { useCartContext } from "../../Context/CartContext";
import Filter from "../Filter/Filter"; // Import Filter component

const Productlist = () => {
  const { addToCart, cartItems = [] } = useCartContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productCount, setProductCount] = useState(0); // Track total products

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
        let url = "https://mern-wudlux-1-lss8.onrender.com/api/products/listByCategory";
        const params = [];
  
        if (category) params.push(`category=${category}`);
        if (subcategory) params.push(`subcategory=${subcategory}`);
        if (material) params.push(`material=${encodeURIComponent(material)}`);
  
        // ✅ Ensure min/max prices are numbers before passing
        const min = minPrice ? Number(minPrice) : 0;
        const max = maxPrice ? Number(maxPrice) : Infinity;
  
        if (minPrice) params.push(`minPrice=${min}`);
        if (maxPrice) params.push(`maxPrice=${max}`);
        if (sortOption) params.push(`sortOption=${sortOption}`);
  
        if (params.length > 0) {
          url += `?${params.join("&")}`;
        }
  
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch products. Status: ${response.status}`);
  
        const result = await response.json();
        if (result.success) {
          let filteredProducts = result.data;
  
          // ✅ Fix: Ensure Material Filtering Works (Check inside materials array)
          if (material) {
            filteredProducts = filteredProducts.filter((product) =>
              Array.isArray(product.materials) &&
              product.materials.some((mat) => mat.toLowerCase() === material.toLowerCase())
            );
          }
  
          // ✅ Fix: Ensure Price Filtering Works
          filteredProducts = filteredProducts.filter((product) => {
            const productPrice = Number(product.price);
            return productPrice >= min && productPrice <= max;
          });
  
          // ✅ Apply Sorting for Different Sort Options
          switch (sortOption) {
            case "Price-low-to-High":
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case "Price-High-to-Low":
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case "Alphabetically: A to Z":
              filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
              break;
            case "Alphabetically: Z to A":
              filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
              break;
            case "Date - old to new":
              filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
              break;
            case "Date - new to old":
              filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              break;
            case "Best Selling":
              filteredProducts.sort((a, b) => b.sales - a.sales); // Assuming `sales` field in database
              break;
            case "Featured":
              filteredProducts.sort((a, b) => b.featuredRank - a.featuredRank); // Assuming `featuredRank`
              break;
            default:
              break;
          }
  
          // ✅ Update product count AFTER all filters have been applied
          setProductCount(filteredProducts.length);
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
    <>
      <Filter productCount={productCount} />
      <div className="shop-product-list-grid">
        
        {loading ? (
          <div className="loadingSpinner">Loading products...</div>
        ) : error ? (
          <div className="errorMessage">⚠️ {error}</div>
        ) : products.length > 0 ? (
          products.map((product) => {
  
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
                    loading="lazy"
                    src={`https://mern-wudlux-1-lss8.onrender.com/uploads/${
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
                      Add to Bag{" "}
                      <img
                        src={bagIcon}
                        alt="Bag Icon"
                        className="shop-product-list-bag-icon"
                        loading="lazy"
                      />
                    </button>
                  </div>
                </div>
                <div className="shop-product-list-details">
                  {/* <p className="shop-product-list-title">{product.title}</p> */}
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
        
    </>
  );  
};

export default Productlist;
