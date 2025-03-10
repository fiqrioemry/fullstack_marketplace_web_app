import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useShopStore = create((set, get) => ({
  store: null,
  orders: null,
  profile: null,
  loading: false,

  // product
  products: null,
  totalPage: 0,
  totalData: 0,
  currentPage: 1,

  getStoreProduct: async (
    formData = {
      sortBy: "createdAt",
      orderBy: "desc",
      page: 1,
      limit: 5,
      search: "",
    }
  ) => {
    try {
      const { products, totalPage, totalData, currentPage } =
        await callApi.getStoreProduct(formData);
      set({
        products,
        totalPage,
        totalData,
        currentPage,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await callApi.deleteProduct(productId);
      await get().getStoreProduct();
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  getStoreInfo: async (shopname) => {
    set({ store: null, products: null });
    try {
      const { store, products } = await callApi.getStoreInfo(shopname);
      set({ store, products });
    } catch (error) {
      set({ store: [], products: [] });
      console.log(error.message);
    }
  },

  getStoreProfile: async () => {
    try {
      const profile = await callApi.getStoreProfile();
      set({ profile });
    } catch (error) {
      console.log(error.message);
    }
  },

  createProduct: async (formData) => {
    set({ loading: true });
    try {
      const res = await callApi.createProduct(formData);
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (formData, productId) => {
    set({ loading: true });
    try {
      const res = await callApi.updateProduct(formData, productId);
      await get().getStoreProduct();
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  getStoreOrders: async () => {
    try {
      const { message, orders } = await callApi.getStoreOrders();
      set({ orders });
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    }
  },

  updateOrderStatus: async () => {
    set({ loading: true });
    try {
      const { message } = await callApi.updateOrderStatus();
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
