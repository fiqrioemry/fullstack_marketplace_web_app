import { create } from "zustand";
import callApi from "@/api/callApi";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: null,
  loading: false,
  checkoutItem: [],

  setCheckoutItem: (state, cartId) => {
    set({
      checkout: state.checkout.includes(cartId)
        ? state.checkout.fiter((id) => id !== cartId)
        : [...state.checkout, cartId],
    });
  },

  getCarts: async () => {
    try {
      const { cart } = await callApi.getCarts();
      set({ cart });
    } catch (error) {
      console.log(error.message);
    }
  },

  updateCart: async (cartId, quantity) => {
    set({ loading: true });
    try {
      const { message } = await callApi.updateCart(cartId, quantity);
      await get().getCarts();
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  removeCart: async (cartId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.removeCart(cartId);
      await get().getCarts();
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  addCart: async (productId, quantity) => {
    try {
      set({ loading: true });
      const { message } = await callApi.addCart(productId, quantity);
      console.log(message);
      await get().getCarts();
      toast.success(message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },
}));
