import Cookies from "js-cookie";
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";

export const useAuthStore = create((set) => ({
  step: 1,
  userData: null,
  isUserAuth: null,
  isAuthLoading: false,

  sendOtpSignUp: async (formData) => {
    try {
      set({ isAuthLoading: true });
      const response = await axiosInstance.post("/api/auth/send-otp", formData);

      if (response.data.success) {
        set({ step: 2 });
      }
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      Promise.reject(error);
      set({ step: 1 });
    } finally {
      set({ isAuthLoading: false });
    }
  },

  verifyOtpSignUp: async (formData) => {
    try {
      set({ isAuthLoading: true });
      const response = await axiosInstance.post(
        "/api/auth/verify-otp",
        formData
      );

      toast.success(response.data.message);
      if (response.data.success) {
        set({ step: 3 });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      Promise.reject(error);
    } finally {
      set({ isAuthLoading: false });
    }
  },

  userSignUp: async (formData) => {
    try {
      set({ isAuthLoading: true });
      const response = await axiosInstance.post("/api/auth/signup", formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      throw error;
    } finally {
      set({ isAuthLoading: false });
    }
  },

  userAuthCheck: async () => {
    try {
      const response = await axiosInstance.get("/api/auth/me");
      set({ userData: response.data.data });
    } catch (error) {
      set({ userData: null });
      Promise.reject(error);
    } finally {
      set({ isUserAuth: false });
    }
  },

  userSignIn: async (formData) => {
    try {
      set({ isAuthLoading: true });
      const response = await axiosInstance.post("/api/auth/signin", formData);
      toast.success(response.data.message);

      Cookies.set("accessToken", response.data.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
        expires: 1 / 48,
      });

      set({ userData: response.data.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    } finally {
      set({ isAuthLoading: false });
      <Navigate to="/" />;
    }
  },

  userSignOut: async () => {
    try {
      set({ isAuthLoading: true });
      const response = await axiosInstance.post("/api/auth/signout");
      toast.success(response.data.message);
      Cookies.remove("accessToken");
      set({ userData: [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isAuthLoading: false });
    }
  },
}));
