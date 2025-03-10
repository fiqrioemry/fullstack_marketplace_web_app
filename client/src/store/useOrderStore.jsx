import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useOrderStore = create((set) => ({
  order: null,
  loading: false,

  createNewOrder: async (formData) => {
    set({ loading: true });
    try {
      const { message, transactionUrl, data } = await callApi.createNewOrder(
        formData
      );

      //   if (transactionUrl) {
      //     window.location.href = transactionUrl;
      //   }

      console.log(data);

      toast.success(message);
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
