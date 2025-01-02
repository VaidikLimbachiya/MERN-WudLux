import React, { createContext, useReducer } from 'react';

// Create the context
export const StoreContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state[action.payload.id];
      if (existingItem) {
        return {
          ...state,
          [action.payload.id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      }
      return {
        ...state,
        [action.payload.id]: { ...action.payload, quantity: 1 },
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedCart = { ...state };
      if (updatedCart[action.payload]?.quantity > 1) {
        updatedCart[action.payload].quantity -= 1; // Decrease by 1
      } else {
        delete updatedCart[action.payload]; // Remove item if quantity is 0
      }
      return updatedCart;
    }

    case 'CLEAR_CART':
      return {};

    default:
      return state;
  }
};



const StoreContextProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, {});

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <StoreContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
