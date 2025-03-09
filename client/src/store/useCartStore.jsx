import { create } from "zustand";
import callApi from "@/api/callApi";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: null,
  loading: false,
  checkoutItem: JSON.parse(localStorage.getItem("checkoutItem")) || [],

  toggleCheckoutItem: (cartId) => {
    const { checkoutItem } = get();
    let updatedCheckout;

    if (checkoutItem.includes(cartId)) {
      updatedCheckout = checkoutItem.filter((id) => id !== cartId);
    } else {
      updatedCheckout = [...checkoutItem, cartId];
    }

    set({ checkoutItem: updatedCheckout });
    localStorage.setItem("checkoutItem", JSON.stringify(updatedCheckout));
  },

  selectAllCheckout: () => {
    const { cart, checkoutItem } = get();
    const allCartIds = cart.flatMap((store) =>
      store.items.map((item) => item.cartId)
    );

    let updatedCheckout;

    if (checkoutItem.length === allCartIds.length) {
      updatedCheckout = [];
    } else {
      updatedCheckout = allCartIds;
    }

    set({ checkoutItem: updatedCheckout });
    localStorage.setItem("checkoutItem", JSON.stringify(updatedCheckout));
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

  removeCheckoutItem: (cartId) => {
    const { checkoutItem } = get();
    const updatedCheckout = checkoutItem.filter((id) => id !== cartId);
    set({ checkoutItem: updatedCheckout });
    localStorage.setItem("checkoutItem", JSON.stringify(updatedCheckout));
  },

  removeCart: async (cartId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.removeCart(cartId);
      get().removeCheckoutItem(cartId);
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
