import { useEffect, useState } from "react";
import "./Productlist.css";
import bagIcon from "../../assets/bag.png"; // Import the bag icon
import { useCartContext } from "../../Context/CartContext"; // Correct import

const Productlist = () => {
  const { addToCart, cartItems = {} } = useCartContext(); // Ensure cartItems is initialized
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // Loading state (fixed)
  const [error, setError] = useState(null); // Error state (fixed)

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/list"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json(); // Store the whole response
        if (result.success) {
          setProducts(result.data); // Access the 'data' key to set products
        } else {
          throw new Error("Failed to fetch products: " + result.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchProducts();
  }, []);

  console.log("Products in state:", products); // Log products inside the JSX

  return (
    <div className="shop-product-list-grid">
      {error ? (
        <div>Error: {error}</div> // Display error message if there's an error
      ) : loading ? (
        <div>Loading products...</div> // Show loading message while fetching data
      ) : Array.isArray(products) && products.length > 0 ? (
        products.map((product ) => (
          <div className="shop-product-list-card" key={product._id}>
            <div className="shop-product-list-image-wrapper">
            <img crossOrigin="anonymous" src={`http://localhost:5000/uploads/${product.image}`} alt={product.title} />
              {product.discount && (
                <div className="shop-product-list-discount-badge">
                  {product.discount}% OFF
                </div>
              )}
              <div className="shop-product-list-bag-button-wrapper">
              <button
  className="shop-product-list-bag-button"
  onClick={() => addToCart(product)} // Pass the entire product object
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
        <div>No products available</div> // Display message if no products are found
      )}
    </div>
  );
};

export default Productlist;
