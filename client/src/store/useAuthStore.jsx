import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../services/callApi";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      step: 1,
      user: null,
      isAuthenticate: null,
      loading: false,

      authCheck: async () => {
        try {
          const user = await callApi.authCheck();
          set({ user, isAuthenticate: true });
        } catch {
          set({ user: null, isAuthenticate: false });
        }
      },
      resendOTP: async (email) => {
        try {
          const data = await callApi.sendOTP(email);
          toast.success(data.message);
        } catch (error) {
          toast.error(error.message);
        }
      },

      login: async (formData) => {
        set({ loading: true });
        try {
          const data = await callApi.login(formData);
          await get().authCheck();
          toast.success(data.message);
        } catch (error) {
          toast.error(error.message);
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          const data = await callApi.logout();
          set({ user: [], isAuthenticate: false });
          toast.success(data.message);
        } catch (error) {
          console.log(error.message);
        }
      },

      register: async (formData, navigate) => {
        set({ loading: true });
        try {
          const step = get().step;

          if (step === 1) {
            const data = await callApi.sendOTP(formData);
            toast.success(data.message);
            set({ step: 2 });
          } else if (step === 2) {
            const data = await callApi.verifyOTP(formData);
            toast.success(data.message);
            set({ step: 3 });
          } else if (step === 3) {
            const data = await callApi.register(formData);
            toast.success(data.message);
            set({ step: 1 });
            navigate("/signin");
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          set({ loading: false });
        }
      },

      refreshToken: async () => {
        try {
          const token = await callApi.refreshToken();
          toast.success(token.message);
          return token;
        } catch (error) {
          console.log(error.message);
        }
      },

      resetPassword: async (token, formData, navigate) => {
        try {
          const data = await callApi.resetPassword(token, formData);
          toast.success(data.message);
          navigate("/login");
        } catch (error) {
          console.log(error.message);
        }
      },

      createStore: async (formData) => {
        try {
          const data = await callApi.createStore(formData);
          toast.success(data.message);
        } catch (error) {
          toast.error(error.message);
        }
      },
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
      partialize: (state) => ({
        user: state.user,
        isAuthenticate: state.isAuthenticate,
        loading: state.loading,
      }),
    }
  )
);
