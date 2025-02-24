import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useAuthStore = create((set, get) => ({
  step: 1,
  user: null,
  store: null,
  loading: false,
  accessToen: null,
  isAuthenticate: null,

  resetStep: () => set({ step: 1 }),

  setAccessToken: (accessToken) => set({ accessToken }),

  resetAuthenticate: () =>
    set({ user: null, isAuthenticate: false, accessToken: null }),

  authCheck: async () => {
    try {
      const user = await callApi.authCheck();
      set({ user, isAuthenticate: true });
    } catch {
      get().resetAuthenticate();
    }
  },
  resendOTP: async (email) => {
    set({ loading: true });
    try {
      const { message } = await callApi.sendOTP(email);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  login: async (formData) => {
    set({ loading: true });
    try {
      const { message, accessToken } = await callApi.login(formData);
      get().setAccessToken(accessToken);
      await get().authCheck();
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      const { message } = await callApi.logout();
      get().resetAuthenticate();
      toast.success(message);
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  register: async (formData, navigate) => {
    set({ loading: true });
    try {
      const step = get().step;
      if (step === 1) {
        const { message } = await callApi.sendOTP(formData);
        toast.success(message);
        set({ step: 2 });
      } else if (step === 2) {
        const { message } = await callApi.verifyOTP(formData);
        toast.success(message);
        set({ step: 3 });
      } else if (step === 3) {
        const { message } = await callApi.register(formData);
        toast.success(message);
        set({ step: 1 });
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  createStore: async (formData) => {
    set({ loading: true });
    try {
      const { message, store } = await callApi.createStore(formData);
      set({ store });
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
