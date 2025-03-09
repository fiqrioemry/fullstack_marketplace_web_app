import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useUserStore = create((set) => ({
  profile: [],
  address: null,
  loading: false,
  updating: false,

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
    try {
      const { address } = await callApi.getAddress();
      set({ address });
    } catch {
      set({ address: [] });
    }
  },

  updateAddress: async (formData, addressId) => {
    try {
      set({ loading: true });
      const { message, updatedAddress } = await callApi.updateAddress(
        formData,
        addressId
      );
      set((state) => ({
        address: state.address.map((add) =>
          add.id === addressId ? [...state.address, updatedAddress] : add
        ),
      }));

      toast.success(message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  addAddress: async (formData) => {
    try {
      set({ loading: true });
      const { message, newAddress } = await callApi.addAddress(formData);
      set((state) => ({ address: [...state.address, newAddress] }));
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
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
