import { create } from "zustand";
import { axiosInstance } from "@/services";

export const useProductStore = create((set) => ({
  search: null,
  product: null,
  products: null,
  recommend: null,
  categories: [],
  cities: [],
  isSearchLoading: false,
  isProductLoading: false,

  getCities: async () => {
    try {
      const response = [
        { id: 1, name: "Medan" },
        { id: 2, name: "Jakarta" },
        { id: 3, name: "Bandung" },
        { id: 4, name: "Semarang" },
        { id: 5, name: "Surabaya" },
      ];
      set({ cities: response });
    } catch (error) {
      console.error(error);
      set({ cities: [] });
    }
  },

  getCategories: async () => {
    try {
      const response = await axiosInstance.get("/category");
      set({ categories: response.data.data });
    } catch (error) {
      console.error(error);
      set({ categories: [] });
    }
  },

  searchProducts: async () => {
    try {
      set({ isSearchLoading: true });
      const response = ["products"];
      set({ search: response });
    } catch (error) {
      console.log(error);
      set({ search: [] });
    } finally {
      set({ isSearchLoading: false });
    }
  },

  getProduct: async (slug) => {
    try {
      const response = await axiosInstance.get(`/product/${slug}`);
      console.log(response);
      set({ product: response.data.data });
    } catch (error) {
      console.log(error);
      set({ product: null });
    }
  },

  getProducts: async (limit) => {
    try {
      const response = await axiosInstance.get(`/product?limit=${limit}`);
      console.log(response);
      set({ products: response.data.data });
    } catch (error) {
      console.error(error);
      set({ products: [] });
    } finally {
      set({ isProductLoading: false });
    }
  },
}));
