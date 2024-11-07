import { ADD_CART } from "../type/cartType";

export const addToCart = (product, amount) => async (dispatch) => {
  dispatch({ type: ADD_CART, payload: { product: product, amount: amount } });
};
