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
  loading: {
    get: false,
    search: false,
    categories: false,
  },

  getProducts: async (searchParams) => {
    console.log(searchParams);
    try {
      set((state) => ({
        loading: { ...state.loading, get: true },
        products: [],
      }));
      const { products, totalPage, totalData, currentPage } =
        await callApi.getProducts(searchParams);

      set({
        products,
        totalPage,
        totalData,
        currentPage,
      });
    } catch {
      set({ products: [] });
    } finally {
      set((state) => ({
        loading: { ...state.loading, get: false },
      }));
    }
  },

  getCategories: async () => {
    set((state) => ({
      loading: { ...state.loading, categories: true },
    }));
    try {
      const categories = await callApi.getCategories();
      set({ categories });
    } catch {
      set((state) => ({
        loading: { ...state.loading, categories: false },
      }));
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
    set((state) => ({
      loading: { ...state.loading, search: true },
      results: [],
    }));
    try {
      const { products } = await callApi.searchProducts(search);
      set({ results: products });
    } catch {
      set({ results: [] });
    } finally {
      set((state) => ({
        loading: { ...state.loading, search: false },
      }));
    }
  },
}));
