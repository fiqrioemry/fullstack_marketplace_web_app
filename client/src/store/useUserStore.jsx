import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../services/callApi";

export const useUserStore = create((set) => ({
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
      const { message, updatedProfile } = await callApi.updateProfile(formData);
      set({ profile: updatedProfile });
      toast.success(message);
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
    } catch (error) {
      toast.error(error.message);
      set({ address: [] });
    } finally {
      set({ loading: false });
    }
  },

  updateAddress: async (formData, addressId) => {
    try {
      set({ updating: true });
      const { message, newAddress } = await callApi.updateAddress(
        formData,
        addressId
      );
      set((state) => ({
        address: state.address.map((add) =>
          add.id === addressId ? newAddress : add
        ),
      }));

      toast.success(message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ updating: false });
    }
  },

  addAddress: async (formData) => {
    try {
      set({ updating: true });
      const { message, newAddress } = await callApi.addAddress(formData);
      set((state) => ({ address: { ...state.address, newAddress } }));
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ updating: false });
    }
  },

  deleteAddress: async (addressId) => {
    try {
      set({ updating: true });
      const { message } = await callApi.deleteAddress(addressId);

      set((state) => ({
        address: state.address.filter((add) => add.id !== addressId),
      }));
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ updating: false });
    }
  },
}));
