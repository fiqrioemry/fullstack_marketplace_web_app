import { create } from "zustand";
import callApi from "@/api/callApi";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: null,
      loading: false,
      checkoutItem: [],

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
        set({ checkoutItem: checkoutItem?.filter((id) => id !== cartId) });
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

      // Menambahkan produk ke dalam cart
      addCart: async (productId, quantity) => {
        try {
          set({ loading: true });
          const { message } = await callApi.addCart(productId, quantity);
          await get().getCarts();
          toast.success(message);
        } catch (err) {
          toast.error(err.message);
        } finally {
          set({ loading: false });
        }
      },

      // Menurunkan jumlah item dalam cart
      handleCartDecrease: (cartItem) => {
        const newQuantity = cartItem.quantity - 1;
        get().updateCart(cartItem.cartId, newQuantity);
      },

      // Meningkatkan jumlah item dalam cart
      handleCartIncrease: (cartItem) => {
        const newQuantity = cartItem.quantity + 1;
        get().updateCart(cartItem.cartId, newQuantity);
      },

      handleDirectCheckout: async (productId, quantity) => {
        const { newCart } = await callApi.addCart(productId, quantity);
        set({ checkoutItem: newCart.id });
        window.location.href = "/cart/checkout";
      },

      // Menambah atau menghapus satu item dari checkoutItem
      toggleCheckoutItem: (cartId) => {
        const { checkoutItem } = get();
        set({
          checkoutItem: checkoutItem.includes(cartId)
            ? checkoutItem.filter((id) => id !== cartId)
            : [...checkoutItem, cartId],
        });
      },

      // Pilih semua atau batalkan semua pilihan checkoutItem
      selectAllCheckout: () => {
        const { cart, checkoutItem } = get();
        const allCartIds = cart.flatMap((store) =>
          store.items.map((item) => item.cartId)
        );

        set({
          checkoutItem:
            checkoutItem.length === allCartIds.length ? [] : allCartIds,
        });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ checkoutItem: [state.checkoutItem] }),
    }
  )
);
