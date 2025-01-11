import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";
import { Navigate } from "react-router-dom";

import { create } from "zustand";

export const useProductStore = create((set) => ({
  search: null,
  product: null,
  products: null,
  recommend: null,
  categories: [],
  cities: [],
  isCitiesLoading: false,
  isSearchLoading: false,
  isProductLoading: false,
  isCategoriesLoading: false,

  getCities: async () => {
    set({ isCitiesLoading: true });
    try {
      // Simulasi fetch API
      const response = [
        { id: 1, name: "Jakarta" },
        { id: 2, name: "Medan" },
        { id: 3, name: "Bandung" },
        { id: 4, name: "Surabaya" },
        { id: 5, name: "Malang" },
      ];
      set({ cities: response, isCitiesLoading: false });
    } catch (error) {
      console.error("Failed to fetch cities:", error);
      set({ cities: [], isCitiesLoading: false });
    }
  },

  getCategories: async () => {
    set({ isCategoriesLoading: true });
    try {
      const response = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Fashion" },
        { id: 3, name: "Food & Beverages" },
        { id: 4, name: "Home & Living" },
        { id: 5, name: "Beauty" },
      ];
      set({ categories: response, isCategoriesLoading: false });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      set({ categories: [], isCategoriesLoading: false });
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

  getProducts: async (limit = 5) => {
    try {
      const response = limit;
      set({ products: response });
    } catch (error) {
      console.error(error);
      set({ products: [] });
    } finally {
      set({ isProductLoading: false });
    }
  },
}));
