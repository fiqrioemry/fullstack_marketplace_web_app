import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useAdminStore = create((set) => ({
  users: null,
  dashboard: null,
  shipments: null,
  categories: null,
  loading: false,

  getAdminDashboardSummary: async () => {
    set({ dashboard: null });
    try {
      const { dashboard } = await callApi.getAdminDashboardSummary();
      set({ dashboard });
    } catch (error) {
      console.error(error.message);
    }
  },

  getAllUsers: async () => {
    set({ users: null });
    try {
      const { users } = await callApi.getAllUsers();
      set({ users });
    } catch (error) {
      console.error(error.message);
    }
  },

  getAllShipments: async () => {
    set({ shipments: null });
    try {
      const { shipments } = await callApi.getAllShipments();
      set({ shipments });
    } catch (error) {
      toast.error(error.message);
    }
  },

  updateShipmentStatus: async (formData, shipmentId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.updateShipmentStatus(
        formData,
        shipmentId
      );
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getCategories: async () => {
    set({ categories: null });
    try {
      const { categories } = await callApi.getCategories();
      set({ categories });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewCategory: async (formData) => {
    set({ loading: true });
    try {
      const { message } = await callApi.createNewCategory(formData);
      set({ message });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  updateCategory: async (formData, categoryId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.updateCategory(formData, categoryId);
      set({ message });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (categoryId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.deleteCategory(categoryId);
      set({ message });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
