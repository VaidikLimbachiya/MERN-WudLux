export const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
  };
  
  export const cartActionTypes = {
    ADD_TO_CART: "ADD_TO_CART",
    UPDATE_QUANTITY: "UPDATE_QUANTITY",
    REMOVE_ITEM: "REMOVE_ITEM",
  };
  
  export const cartReducer = (state, action) => {
    switch (action.type) {
      case cartActionTypes.ADD_TO_CART:
        const existingItem = state.cartItems.find(item => item.id === action.payload.id);
        if (existingItem) {
          return {
            ...state,
            cartItems: state.cartItems.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item
            ),
            totalQuantity: state.totalQuantity + action.payload.quantity,
            totalPrice: state.totalPrice + action.payload.price * action.payload.quantity,
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, action.payload],
            totalQuantity: state.totalQuantity + action.payload.quantity,
            totalPrice: state.totalPrice + action.payload.price * action.payload.quantity,
          };
        }
  
      case cartActionTypes.UPDATE_QUANTITY:
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.max(1, item.quantity + action.payload.change) }
              : item
          ),
          totalQuantity: state.cartItems.reduce((acc, item) => acc + (item.id === action.payload.id ? Math.max(1, item.quantity + action.payload.change) - item.quantity : 0), state.totalQuantity),
          totalPrice: state.cartItems.reduce((acc, item) => acc + (item.id === action.payload.id ? (item.quantity + action.payload.change) * item.price - item.quantity * item.price : 0), state.totalPrice),
        };
  
      case cartActionTypes.REMOVE_ITEM:
        const removedItem = state.cartItems.find(item => item.id === action.payload.id);
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
          totalQuantity: state.totalQuantity - removedItem.quantity,
          totalPrice: state.totalPrice - removedItem.price * removedItem.quantity,
        };
  
      default:
        return state;
    }
  };
  