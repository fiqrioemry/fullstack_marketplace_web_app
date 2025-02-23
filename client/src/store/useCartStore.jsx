import { create } from "zustand";
import callApi from "@/api/callApi";
import toast from "react-hot-toast";

export const useCartStore = create((set) => ({
  cart: [],
  loading: false,

  getCarts: async () => {
    set({ loading: true });
    try {
      const cart = await callApi.getCarts();
      set({ cart });
    } catch {
      set({ cart: [] });
    } finally {
      set({ loading: false });
    }
  },

  updateCart: async (formData, cartId) => {
    set({ updating: true });
    try {
      const { message, quantity } = await callApi.updateCart(formData, cartId);

      set((state) => ({
        cart: state.cart.map((c) => (c.id === cartId ? { ...c, quantity } : c)),
      }));

      toast.success(message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ updating: false });
    }
  },

  deleteCart: async (cartId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.deleteCart(cartId);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  addCart: async (formData) => {
    try {
      set({ loading: true });

      // Panggil API untuk menambahkan produk ke keranjang
      const { message, newCart } = await callApi.addCart(formData);

      set((state) => ({
        cart: state.cart.some((c) => c.id === newCart.id)
          ? state.cart.map((c) =>
              c.id === newCart.id ? { ...c, quantity: newCart.quantity } : c
            )
          : [...state.cart, newCart], // Jika tidak ada, tambahkan item baru
      }));

      toast.success(message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },
}));
