import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../services/callApi";

export const useShopStore = create((set) => ({
  storeProfile: [],
  storeProducts: [],
  loading: false,

  // getShopProducts: async () => {
  //   try {
  //     const response = await axiosInstance.get(`/store/product/get`);
  //     console.log(response);
  //     set({ shopProducts: response.data.data });
  //   } catch (error) {
  //     console.log(error);
  //     set({ shopProducts: null });
  //   }
  // },

  createProduct: async (formData) => {
    set({ loading: false });
    try {
      const res = await callApi.createProduct(formData);
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  // updateProduct: async (productId) => {
  //   try {
  //     const data = console.log(productId);
  //     set({ products: data });
  //   } catch (error) {
  //     console.error(error);
  //     set({ products: [] });
  //   }
  // },

  // deleteProduct: async (productId) => {
  //   try {
  //     const data = console.log(productId);
  //     set({ products: data });
  //   } catch (error) {
  //     console.error(error);
  //     set({ products: [] });
  //   }
  // },
}));
