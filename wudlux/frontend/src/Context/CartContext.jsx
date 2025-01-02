import { createContext, useContext, useReducer } from "react";
import { cartReducer, initialState, cartActionTypes } from "../Reducer/cartReducer";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: cartActionTypes.ADD_TO_CART, payload: item });
  };

  const updateQuantity = (id, change) => {
    dispatch({ type: cartActionTypes.UPDATE_QUANTITY, payload: { id, change } });
  };

  const removeItem = (id) => {
    dispatch({ type: cartActionTypes.REMOVE_ITEM, payload: { id } });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
