import  { useEffect, useState } from "react";
import "./Productlist.css";
import bagIcon from "../../assets/bag.png"; // Import the bag icon
import { useCartContext } from "../../Context/CartContext"; // Correct import

const Productlist = () => {
  const { addToCart, cartItems = {} } = useCartContext(); // Ensure cartItems is initialized
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Update state with fetched products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="shop-product-list-grid">
    {products.map((product) => (
      <div className="shop-product-list-card" key={product._id}>
        <div className="shop-product-list-image-wrapper">
          <img crossOrigin="anonymous" src={product.image} alt={product.title} className="shop-product-list-image" />
          {product.discount && (
            <div className="shop-product-list-discount-badge">{product.discount}% OFF</div>
          )}
          <div className="shop-product-list-bag-button-wrapper">
            <button
              className="shop-product-list-bag-button"
              onClick={() => addToCart(product)} // Dispatch ADD_TO_CART action
            >
              <img src={bagIcon} alt="Bag Icon" className="shop-product-list-bag-icon" />
              {cartItems[product._id]?.quantity ? "In Bag" : "Add to Bag"}
            </button>
          </div>
        </div>
        <div className="shop-product-list-details">
          <p className="shop-product-list-title">{product.title}</p>
          <div className="shop-product-list-price-details">
            <span className="shop-product-list-current-price">₹{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="shop-product-list-original-price">₹{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default Productlist;
