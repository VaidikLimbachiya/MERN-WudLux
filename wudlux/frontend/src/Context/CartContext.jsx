import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect to login if token is invalid or expired
  const redirectToLogin = () => {
    localStorage.removeItem("accessToken");
    clearCartState(); // Clear cart when redirecting to login
    navigate("/log-in");
  };

  // Fetch cart items
  const fetchCart = async (force = false) => {
    const token = localStorage.getItem("accessToken");
  
    if (!user || !user.id || (!token && !force)) {
      console.log("Fetching guest cart...");
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCartItems([...guestCart]); // 🔥 Force re-render
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`http://localhost:5000/api/cart?userId=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 401) {
        console.warn("Token expired. Redirecting to login.");
        redirectToLogin();
        return;
      }
  
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
  
      const data = await response.json();
      setCartItems([...data.cartItems]); // 🔥 Force re-render by updating the state with a new array
      window.dispatchEvent(new Event("cartUpdated")); // 🔥 Notify Navbar and other components
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  
  

  // Add an item to the cart
  const addToCart = async (product) => {
    if (!product || !product._id) {
      console.error("Invalid product data:", product);
      return;
    }
  
    const token = localStorage.getItem("accessToken");
    setError(null);
  
    try {
      // Normalize productId
      const productId = product.productId || product._id;
  
      if (!token) {
        // Handle Guest Cart: Store in localStorage
        console.log("User not logged in, adding to guest cart");
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        
        const existingItemIndex = guestCart.findIndex((item) => item.productId === productId);
        if (existingItemIndex > -1) {
          guestCart[existingItemIndex].quantity += 1; // Increase quantity if already in cart
        } else {
          guestCart.push({ ...product, productId, quantity: 1 });
        }
  
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        setCartItems(guestCart); // Update state
        return;
      }
  
      // Handle Logged-in User Cart
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: 1, 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
  
      await fetchCart(); // Sync cart with backend
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError(err.message);
    }
  };
  
  
   


  // Update item quantity
  const updateQuantity = async (productId, delta) => {
    const token = localStorage.getItem("accessToken");
    setError(null);
  
    if (!token) {
      // Handle Guest Cart Update
      console.log("Updating quantity in guest cart...");
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
  
      const updatedCart = guestCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
  
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      return;
    }
  
    // Handle Logged-in User Cart Update
    try {
      const existingItem = cartItems.find((item) => item.productId === productId);
      if (!existingItem) {
        console.error("Item not found in cart");
        return;
      }
  
      const newQuantity = Math.max(1, existingItem.quantity + delta);
  
      const response = await fetch("http://localhost:5000/api/cart/update", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }
  
      await fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err.message);
    }
  };    

  

  // Remove an item from the cart
  const removeItem = async (productId) => {
    const token = localStorage.getItem("accessToken");
    setError(null);
  
    if (!token) {
      // Handle Guest Cart Removal
      console.log("Removing item from guest cart...");
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const updatedCart = guestCart.filter((item) => item.productId !== productId);
  
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      return;
    }
  
    // Handle Logged-in User Cart Removal
    try {
      const response = await fetch("http://localhost:5000/api/cart/remove", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to remove item");
      }
  
      await fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
      setError(err.message);
    }
  };
  

  // Clear the entire cart
  const clearCart = async () => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      // Clear Guest Cart
      console.log("Clearing guest cart...");
      localStorage.removeItem("guestCart");
      setCartItems([]);
      return;
    }
  
    // Clear Logged-in User Cart
    try {
      const response = await fetch("http://localhost:5000/api/cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }
  
      await fetchCart();
    } catch (err) {
      console.error("Error clearing cart:", err);
      setError(err.message);
    }
  };
  


  // Clear cart state locally (e.g., on logout)
  const clearCartState = () => {
    setCartItems([]);
  };

  // Watch for login/logout and refresh cart accordingly
  useEffect(() => {
    if (user?.id) {
      console.log("User logged in, fetching backend cart...");
      fetchCart(true); // 🔥 Fetch cart when user logs in
    }
  
    // Listen for global cart update events
    const handleCartUpdate = () => {
      console.log("Cart update event detected. Fetching latest cart...");
      fetchCart(true);
    };
  
    window.addEventListener("cartUpdated", handleCartUpdate);
  
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [user?.id]);
  
  
  
  
  

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0), 0
  );
  
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0
  );
  
  const totalProducts = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        fetchCart,
        totalPrice,
        totalProducts,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCartContext = () => useContext(CartContext);
