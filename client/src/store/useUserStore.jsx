import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useUserStore = create((set, get) => ({
  profile: [],
  address: null,
  loading: false,

  getProfile: async () => {
    set({ loading: true });
    try {
      const { profile } = await callApi.getProfile();
      set({ profile });
    } catch {
      set({ user: [] });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (formData) => {
    set({ loading: true });
    try {
      const { message, updatedProfile } = await callApi.updateProfile(formData);
      set({ profile: updatedProfile });
      toast.success(message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  getAddress: async () => {
    try {
      const { address } = await callApi.getAddress();
      set({ address });
    } catch {
      set({ address: [] });
    }
  },

  addAddress: async (formData) => {
    try {
      set({ loading: true });
      const { message, newAddress } = await callApi.addAddress(formData);
      get().setNewAddress(newAddress);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  setNewAddress: (newAddress) => {
    set((state) => ({
      address: newAddress.isMain
        ? state.address
            .map((add) => ({ ...add, isMain: false }))
            .concat(newAddress)
        : [...state.address, newAddress],
    }));
  },

  updateAddress: async (formData, addressId) => {
    try {
      set({ loading: true });
      const { message, updatedAddress } = await callApi.updateAddress(
        formData,
        addressId
      );

      get().setUpdatedAddress(addressId, updatedAddress);

      toast.success(message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  setUpdatedAddress: (addressId, updatedAddress) => {
    set((state) => ({
      address: state.address.map((add) =>
        add.id === addressId
          ? updatedAddress
          : updatedAddress.isMain
          ? { ...add, isMain: false }
          : add
      ),
    }));
  },

  deleteAddress: async (addressId) => {
    try {
      set({ loading: true });
      const { message } = await callApi.deleteAddress(addressId);
      get().setDeletedAddress(addressId);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  setDeletedAddress: (addressId) => {
    set((state) => ({
      address: state.address.filter((add) => add.id !== addressId),
    }));
  },
}));
