import { create } from "zustand";
import callApi from "@/api/callApi";

export const useProductStore = create((set) => ({
  results: [],
  product: [],
  products: [],
  categories: [],
  totalPage: 0,
  totalData: 0,
  currentPage: 0,
  loading: false,
  message: null,

  getProducts: async (searchParams) => {
    try {
      set({ loading: true });
      const { products, totalPage, totalData, currentPage } =
        await callApi.getProducts(searchParams);
      set({ products, totalPage, totalData, currentPage });
    } catch {
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },

  getCategories: async () => {
    try {
      const categories = await callApi.getCategories();
      set({ categories });
    } catch (error) {
      set({ message: error.message });
    }
  },

  getProduct: async (slug) => {
    set((state) => ({
      loading: { ...state.loading, get: true },
    }));
    try {
      const product = await callApi.getProduct(slug);
      set({ product });
    } catch {
      set({ product: [] });
    }
    set((state) => ({
      loading: { ...state.loading, get: true },
    }));
  },

  searchProducts: async (search) => {
    set({ loading: true });
    try {
      const { products } = await callApi.searchProducts(search);
      set({ results: products });
    } catch {
      set({ results: [] });
    } finally {
      set({ loading: false });
    }
  },
}));
