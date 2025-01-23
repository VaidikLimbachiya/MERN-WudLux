import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage or initialize as empty
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };  
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };
  
  

  const clearCart = () => {
    setCartItems([]);  // This should just reset the cart items, no recursion.
  };

  const totalProducts = cartItems.length; // Total unique products
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0); // Total quantity
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ); // Total price

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalProducts,
        totalQuantity,
        totalPrice,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart, // Added clearCart function
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
