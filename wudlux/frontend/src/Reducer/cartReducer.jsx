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
  const quantityToAdd = action.payload.quantity || 1; // Default to 1 if quantity is not provided
  if (existingItem) {
    return {
      ...state,
      cartItems: state.cartItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      ),
      totalQuantity: state.totalQuantity + quantityToAdd,
      totalPrice: state.totalPrice + action.payload.price * quantityToAdd,
    };
  } else {
    return {
      ...state,
      cartItems: [...state.cartItems, { ...action.payload, quantity: quantityToAdd }],
      totalQuantity: state.totalQuantity + quantityToAdd,
      totalPrice: state.totalPrice + action.payload.price * quantityToAdd,
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
      totalQuantity: state.cartItems.reduce(
        (acc, item) =>
          acc +
          (item.id === action.payload.id
            ? Math.max(1, item.quantity + action.payload.change) - item.quantity
            : 0),
        state.totalQuantity
      ),
      totalPrice: state.cartItems.reduce(
        (acc, item) =>
          acc +
          (item.id === action.payload.id
            ? (Math.max(1, item.quantity + action.payload.change) - item.quantity) * item.price
            : 0),
        state.totalPrice
      ),
    };
  
  
      default:
        return state;
    }
  };
  