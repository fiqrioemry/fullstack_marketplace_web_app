import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useAdminStore = create((set, get) => ({
  users: null,
  statistic: null,
  shipments: null,
  categories: null,
  loading: false,

  getAdminDashboardSummary: async () => {
    set({ statistic: null });
    try {
      const { statistic } = await callApi.getAdminDashboardSummary();
      set({ statistic });
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
      const { message, newCategory } = await callApi.createNewCategory(
        formData
      );
      get().setNewCategory(newCategory);
      toast.success(message);
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },
  setNewCategory: (newCategory) => {
    set((state) => ({
      categories: [...state.categories, newCategory],
    }));
  },

  updateCategory: async (formData, categoryId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.updateCategory(formData, categoryId);
      await get().getCategories();
      toast.success(message);
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
      get().setDeletedCategory(categoryId);
      toast.success(message);
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  setDeletedCategory: (categoryId) => {
    set((state) => ({
      categories: state.categories.filter((cat) => cat.id !== categoryId),
    }));
  },
}));
