import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../services/callApi";

export const useUserStore = create((set, get) => ({
  profile: [],
  address: [],
  loading: false,
  updating: false,

  getProfile: async () => {
    set({ loading: true });
    try {
      const profile = await callApi.getProfile();
      set({ profile });
    } catch {
      set({ user: [] });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (formData) => {
    set({ updating: true });
    try {
      console.log(formData);
      const res = await callApi.updateProfile(formData);
      await get().getProfile();
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ updating: false });
    }
  },

  getAddress: async () => {
    set({ loading: true });
    try {
      const address = await callApi.getAddress();
      set({ address });
    } catch (err) {
      toast.error(err.message);
      set({ address: [] });
    } finally {
      set({ loading: false });
    }
  },

  updateAddress: async (formData, addressId) => {
    try {
      set({ updating: true });
      const res = await callApi.updateAddress(formData, addressId);
      await get().getAddress();
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ updating: false });
    }
  },

  addAddress: async (formData) => {
    try {
      set({ updating: true });
      const res = await callApi.addAddress(formData);
      await get().getAddress();
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ updating: false });
    }
  },

  deleteAddress: async (addressId) => {
    try {
      set({ updating: true });
      const res = await callApi.deleteAddress(addressId);
      await get().getAddress();
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ updating: false });
    }
  },
}));
