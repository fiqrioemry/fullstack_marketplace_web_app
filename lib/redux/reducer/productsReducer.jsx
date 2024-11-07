import {
  GET_PRODUCT,
  GET_PRODUCTS,
  SEARCH_PRODUCT,
} from "../type/productsType";

const initialState = {
  product: [],
  products: [],
  results: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
      };
    case SEARCH_PRODUCT:
      return {
        ...state,
        results: action.payload,
      };

    default:
      return state;
  }
};
