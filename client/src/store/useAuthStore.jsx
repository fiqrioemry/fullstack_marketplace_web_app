import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useAuthStore = create((set, get) => ({
  step: 1,
  user: null,
  store: null,
  loading: false,
  accessToken: null,
  checkingAuth: true,

  resetStep: () => set({ step: 1 }),

  setAccessToken: (accessToken) => set({ accessToken }),

  authCheck: async () => {
    try {
      const { user } = await callApi.authCheck();
      set({ user });
    } catch {
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
  sendOTP: async (email) => {
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
      const { message, accessToken, user } = await callApi.login(formData);
      set({ user, accessToken });
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const { message } = await callApi.logout();
      toast.success(message);
    } catch (error) {
      console.log(error.message);
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
      await get().authCheck();
      set({ store });
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
