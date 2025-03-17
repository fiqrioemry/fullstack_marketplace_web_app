import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";
import { useAuthStore } from "./useAuthStore";

export const useShopStore = create((set, get) => ({
  order: null,
  orders: null,
  profile: null,
  loading: false,
  statistic: null,
  notifications: null,

  // product
  products: null,
  totalPage: 0,
  totalData: 0,
  currentPage: 1,

  getStoreStatisticSummary: async () => {
    set({ statistic: null });
    try {
      const { statistic } = await callApi.getStoreStatisticSummary();
      set({ statistic });
    } catch (error) {
      console.error(error.message);
    }
  },

  createStore: async (formData) => {
    set({ loading: true });
    try {
      const { message, store } = await callApi.createStore(formData);
      await useAuthStore.getState().authCheck();
      set({ store });
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  // store products management
  getStoreProducts: async (searchParams) => {
    try {
      set({ loading: true });
      const { products, totalPage, totalData, currentPage } =
        await callApi.getStoreProducts(searchParams);
      set({ products, totalPage, totalData, currentPage });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  createProduct: async (formData) => {
    set({ loading: true });
    try {
      const { message } = await callApi.createProduct(formData);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (formData, productId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.updateProduct(formData, productId);
      await get().getStoreProducts();
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.deleteProduct(productId);
      await get().getStoreProduct();
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getStoreProfile: async () => {
    set({ profile: null });
    try {
      const profile = await callApi.getStoreProfile();
      set({ profile });
    } catch (error) {
      console.log(error.message);
    }
  },

  // TODO : Create feature update store profile
  updateStoreProfile: async (formData) => {
    set({ loading: true });
    try {
      const { message, updatedProfile } = await callApi.updateStoreProfile(
        formData
      );
      set({ profile: updatedProfile });
      toast.success(message);
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  // store orders management
  getAllStoreOrders: async (params) => {
    set({ orders: null });
    try {
      const { orders } = await callApi.getAllStoreOrders(params);
      set({ orders });
    } catch (error) {
      console.error(error.message);
    }
  },

  getStoreOrderDetail: async (orderId) => {
    set({ orderDetail: null });
    try {
      const { order } = await callApi.getStoreOrderDetail(orderId);
      set({ order });
    } catch (error) {
      console.error(error.message);
    }
  },

  cancelStoreOrder: async (formData, orderId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.cancelStoreOrder(formData, orderId);
      toast.success(message);
      await get().getAllStoreOrders();
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  proceedStoreOrder: async (formData, orderId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.proceedStoreOrder(formData, orderId);
      await get().getAllStoreOrders();
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getStoreNotifications: async () => {
    set({ notifications: null });
    try {
      const { notifications } = await callApi.getStoreNotifications();
      set({ notifications });
    } catch (error) {
      toast.error(error.message);
    }
  },
}));
