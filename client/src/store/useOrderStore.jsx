import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useOrderStore = create((set) => ({
  order: null,
  loading: false,

  createNewOrder: async (formData) => {
    set({ loading: true });
    try {
      const { message, transactionUrl } = await callApi.createNewOrder(
        formData
      );

      console.log(transactionUrl);
      if (transactionUrl) {
        window.location.href = transactionUrl;
      }

      toast.success(message);
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
