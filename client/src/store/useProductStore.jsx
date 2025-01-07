import Cookies from "js-cookie";
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";
import { Navigate } from "react-router-dom";

export const useProductStore = create((set) => ({
  search: null,
  product: null,
  products: null,
  recommend: null,
  categories: null,
  cities: null,
  isSearchLoading: false,
  isProductLoading: false,

  getCategories: async () => {
    try {
      console.log("get categories");
      const response = ["electronics", "clothes", "apparel", "food", "drink"];
      set({ categories: response });
    } catch (error) {
      console.log(error);
      set({ categories: [] });
    }
  },

  getCities: async () => {
    try {
      console.log("get cities");
      const response = ["jakarta", "medan", "bandung", "surabaya"];
      set({ cities: response });
    } catch (error) {
      console.log(error);
      set({ cities: [] });
    }
  },

  searchProducts: async ({ params }) => {
    try {
      set({ isSearchLoading: true });
      console.log("search Product");
      const response = ["products"];
      set({ search: response });
    } catch (error) {
      console.log(error);
      set({ search: [] });
    } finally {
      set({ isSearchLoading: false });
    }
  },

  getProduct: async () => {
    try {
      const response = console.log("get product");
      set({ product: response });
    } catch (error) {
      console.log(error);
      set({ product: [] });
    }
  },

  getProducts: async (limit) => {
    try {
      set({ isProductLoading: true });
      setTimeout(() => {
        console.log("get products : ", limit);
        const response = ["products"];
        set({ products: limit });
        set({ isProductLoading: false }); // Dipindahkan ke sini
      }, 1000);
    } catch (error) {
      console.log(error);
      set({ products: [] });
      set({ isProductLoading: false }); // Tetap di sini untuk menangani error
    }
  },
}));
