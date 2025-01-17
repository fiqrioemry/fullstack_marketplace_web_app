import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";

export const useUserStore = create((set) => ({
  profile: null,
  address: null,
  isProfileLoading: false,
  isAddressLoading: false,

  getUserProfile: async () => {
    try {
      set({ isProfileLoading: true });
      const response = await axiosInstance.get("/user/profile");
      set({ profile: response.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isProfileLoading: false });
    }
  },

  updateUserProfile: async (formData) => {
    try {
      set({ isProfileLoading: true });
      const response = await axiosInstance.put("/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      set({ profile: response.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isProfileLoading: false });
    }
  },

  getUserAddress: async () => {
    try {
      set({ isAddressLoading: true });
      const response = await axiosInstance.get("/user/profile/address");
      set({ address: response.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isAddressLoading: false });
    }
  },

  updateUserAddress: async (formData, addressId) => {
    try {
      set({ isAddressLoading: true });
      const response = await axiosInstance.put(
        `/user/profile/address/${addressId}`,
        formData
      );
      toast.success(response.data.message);
      set({ address: response.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isAddressLoading: false });
    }
  },

  addUserAddress: async (formData) => {
    try {
      console.log("berhasil masuk");
      set({ isAddressLoading: true });
      const response = await axiosInstance.post(
        `/user/profile/address`,
        formData
      );
      toast.success(response.data.message);
      set({ address: response.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isAddressLoading: false });
    }
  },

  deleteUserAddress: async (formData, addressId) => {
    try {
      set({ isAddressLoading: true });
      const response = await axiosInstance.delete(
        `/user/profile/address/${addressId}`,
        formData
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isAddressLoading: false });
    }
  },
}));
