import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useUserStore = create((set, get) => ({
  profile: null,
  address: null,
  loading: false,
  transactions: null,

  getProfile: async () => {
    set({ profile: null });
    try {
      const { profile } = await callApi.getProfile();
      set({ profile });
    } catch (error) {
      console.log(error.message);
    }
  },

  updateProfile: async (formData) => {
    set({ loading: true });
    try {
      const { message, updatedProfile } = await callApi.updateProfile(formData);
      set({ profile: updatedProfile });
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getAddress: async () => {
    try {
      const { address } = await callApi.getAddress();
      set({ address });
    } catch (error) {
      console.log(error.message);
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

  // user / customer transaction management
  getUserTransactions: async () => {
    try {
      const { message, transactions } = await callApi.getUserTransactions();
      set({ transactions });
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    }
  },

  createNewTransactions: async (formData) => {
    set({ loading: true });
    try {
      const { message, transactionUrl } = await callApi.createNewTransactions(
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
