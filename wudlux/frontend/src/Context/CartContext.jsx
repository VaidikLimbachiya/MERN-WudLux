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
  
      let data = await response.json();
  
      // Remove duplicates by grouping items by productId
      const uniqueCartItems = [];
      const itemMap = new Map();
  
      data.cartItems.forEach((item) => {
        if (itemMap.has(item.productId)) {
          itemMap.get(item.productId).quantity += item.quantity; // Merge quantity
        } else {
          itemMap.set(item.productId, { ...item });
        }
      });
  
      uniqueCartItems.push(...itemMap.values());
  
      setCartItems(uniqueCartItems); // Update cart state with unique items
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
  
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1, // 👈 Always send 1 instead of total quantity
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
  
    const existingItem = cartItems.find((item) => item.productId === productId);
    if (!existingItem) {
      console.error("Item not found in cart");
      return;
    }
  
    const newQuantity = Math.max(1, existingItem.quantity + delta);
  
    try {
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
  
      const updatedCart = await response.json(); // Ensure backend returns the updated cart
      console.log("Updated Cart:", updatedCart);
  
      // Update state without duplication
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err.message);
    }
  };  

  

  // Remove an item from the cart
  const removeItem = async (productId) => {
    const token = localStorage.getItem("accessToken");
    setError(null);

    try {
      console.log("Removing productId:", productId);

      const response = await fetch("http://localhost:5000/api/cart/remove", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("API Error Response:", errorResponse);
        throw new Error(errorResponse.message || "Failed to remove item");
      }

      // Refresh cart data after successful removal
      await fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
      setError(err.message);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      // Instead of calling a non-existent API, clear cart locally
      setCartItems([]);
      console.log("Cart cleared successfully.");
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
};


  // Clear cart state locally (e.g., on logout)
  const clearCartState = () => {
    setCartItems([]);
  };

  // Watch for login/logout and refresh cart accordingly
  useEffect(() => {
    if (user && user.id) {
      fetchCart(true);
    } else {
      clearCartState(); // Clear cart when user logs out
    }
  }, [user]); //   Runs every time user logs in or out
  
  

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
