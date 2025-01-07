import Cookies from "js-cookie";
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";
import { Navigate } from "react-router-dom";

export const useCartStore = create((set) => ({
  cart: null,
  message: null,
  isCartLoading: false,

  getCartItems: async ({ userId }) => {
    try {
      const response = console.log("get cart item user :", userId);
      set({ cart: response });
    } catch (error) {
      console.log(error);
    }
  },

  addCartItem: async ({ productId, quantity }) => {
    try {
      set({ isCartLoading: true });
      const response = console.log(
        "adding product to cart",
        productId,
        "and",
        quantity
      );
      toast.success(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    } finally {
      set({ isCartLoading: false });
    }
  },

  removeCartItem: async ({ productId }) => {
    try {
      set({ isCartLoading: true });
      const response = console.log("remove product from cart", productId);
      toast.success(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    } finally {
      set({ isCartLoading: false });
    }
  },
}));
