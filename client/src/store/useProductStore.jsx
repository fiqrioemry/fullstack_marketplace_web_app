import { create } from "zustand";
import callApi from "../services/callApi";

export const useProductStore = create((set) => ({
  product: [],
  products: [],
  currentPage: 0,
  totalPage: 0,
  totalData: 0,
  categories: [],
  cities: [],
  loading: false,

  getCities: () => {
    set({
      cities: [
        { id: 1, name: "Medan" },
        { id: 2, name: "Jakarta" },
        { id: 3, name: "Bandung" },
        { id: 4, name: "Yogyakarta" },
        { id: 5, name: "Surabaya" },
      ],
    });
  },

  getCategories: async () => {
    try {
      const categories = await callApi.getCategories();
      set({ categories });
    } catch (err) {
      console.err(err.message);
      set({ categories: [] });
    }
  },

  getProduct: async (slug) => {
    try {
      const product = await callApi.getProduct(slug);
      set({ product });
    } catch (err) {
      console.err(err.message);
      set({ product: [] });
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

      console.log(products);
    } catch (err) {
      console.error(err.message);
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },
}));
