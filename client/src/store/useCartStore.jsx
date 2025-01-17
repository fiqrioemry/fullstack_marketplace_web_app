import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";

export const useCartStore = create((set) => ({
  cart: null,
  message: null,
  isCartLoading: false,

  getCartItems: async () => {
    try {
      const response = await axiosInstance.get("/cart");

      set({ cart: response.data.cart });
    } catch (error) {
      console.log(error);

      set({ cart: [] });
    }
  },

  addCartItem: async (formData) => {
    try {
      set({ isCartLoading: true });

      const response = await axiosInstance.post("/cart", formData);

      toast.success(response.data.message);

      set({ cart: response.data.cart });
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    } finally {
      set({ isCartLoading: false });
    }
  },

  removeCartItem: async (cartId) => {
    try {
      set({ isCartLoading: true });

      const response = await axiosInstance.delete(`/cart/${cartId}`);

      toast.success(response.data.message);

      set({ cart: response.data.cart });
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    } finally {
      set({ isCartLoading: false });
    }
  },
}));
