import apiClient from "../apiClient";

export const getProducts = async () => {
  try {
    const { data } = await apiClient.get("/products?limit=194");
    return data.products;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (id) => {
  try {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchProducts = async (query) => {
  try {
    const { data } = await apiClient.get(`/products/search?q=${query}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const { data } = await apiClient.get(`/products/category/${category}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
