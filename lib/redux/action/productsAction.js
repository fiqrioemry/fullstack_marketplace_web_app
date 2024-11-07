import {
  SEARCH_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
} from "../type/productsType";
import apiClient from "@/services/apiClient";

export const getProduct = () => async (dispatch) => {
  const { data } = await apiClient.get("/products?limit=194");
  dispatch({ type: GET_PRODUCTS, payload: data });
};

export const getProducts = (id) => async (dispatch) => {
  const { data } = await apiClient.get(`/products/${id}`);
  dispatch({ type: GET_PRODUCT, payload: data });
};

export const searchProduct = (query) => async (dispatch) => {
  const { data } = await apiClient.get(`/products/search?q=${query}`);
  dispatch({ type: SEARCH_PRODUCT, payload: data });
};
