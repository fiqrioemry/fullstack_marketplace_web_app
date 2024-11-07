import { thunk } from "redux-thunk";
import { cartReducer } from "./reducer/cartReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./reducer/productsReducer";

const reducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
