import { ADD_CART } from "../type/cartType";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      const cartIndex = cart.findIndex((item) => item.id === action.payload.id);

      if (cartIndex >= 0) {
        const updatedCart = cart.map((item) =>
          item.id === product.id ? item.amount + amount : item
        );
        return {
          ...state,
          cart: updatedCart,
        };
      }

      break;

    default:
      return state;
  }
};
