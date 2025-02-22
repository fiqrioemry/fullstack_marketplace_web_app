import { create } from "zustand";
import callApi from "../api/callApi";

export const useProductStore = create((set) => ({
  product: [],
  products: [],
  search: [],
  categories: [],
  totalPage: 0,
  totalData: 0,
  currentPage: 0,
  loading: false,

  getCategories: async () => {
    try {
      const categories = await callApi.getCategories();
      set({ categories });
    } catch {
      set({ categories: [] });
    }
  },

  getProduct: async (slug) => {
    set({ loading: true });
    try {
      const product = await callApi.getProduct(slug);
      set({ product });
    } catch {
      set({ product: [] });
    }
    set({ loading: false });
  },

  searchProduct: async (search) => {
    set({ loading: true });
    try {
      const { products } = await callApi.searchProduct(search);
      set({ search: products });
    } catch (error) {
      console.error(error.message);
      set({ search: [] });
    } finally {
      set({ loading: false });
    }
  },

  getProducts: async (searchQuery) => {
    try {
      set({ loading: true });
      const { products, totalPage, totalData, currentPage } =
        await callApi.getProducts(searchQuery);
      set({
        products,
        totalPage,
        totalData,
        currentPage,
      });
    } catch (error) {
      console.error(error.message);
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },
}));
