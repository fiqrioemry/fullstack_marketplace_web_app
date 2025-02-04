import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import authService from "../services/authService";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      step: 1,
      user: null,
      isAuthenticate: null,
      loading: false,

      authCheck: async () => {
        try {
          const user = await authService.authCheck();
          set({ user, isAuthenticate: true });
        } catch {
          set({ user: null, isAuthenticate: false });
        }
      },

      login: async (formData) => {
        set({ loading: true });
        try {
          const data = await authService.login(formData);
          await get().authCheck(); // Memanggil authCheck langsung dari get()
          toast.success(data.message);
        } catch (error) {
          if (error.message) toast.error(error.message);
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          const data = await authService.logout();
          set({ user: null, isAuthenticate: false });
          toast.success(data.message);
        } catch (error) {
          toast.error(error.message);
        } finally {
          set({ loading: false });
        }
      },

      register: async (formData, navigate) => {
        set({ loading: true });
        try {
          const step = get().step; // Ambil nilai step yang benar

          if (step === 1) {
            const data = await authService.sendOTP(formData);
            toast.success(data.message);
            set({ step: 2 });
          } else if (step === 2) {
            const data = await authService.verifyOTP(formData);
            toast.success(data.message);
            set({ step: 3 });
          } else if (step === 3) {
            const data = await authService.register(formData);
            toast.success(data.message);
            set({ step: 1 });
            if (navigate) navigate("/login"); // Cegah error jika navigate tidak ada
          }
        } catch (error) {
          if (error.message) toast.error(error.message);
        } finally {
          set({ loading: false });
        }
      },

      refreshToken: async () => {
        try {
          const token = await authService.refreshToken();
          if (token.message) toast.success(token.message);
          return token;
        } catch (error) {
          if (error.message) toast.error(error.message);
        }
      },

      resetPassword: async (token, formData, navigate) => {
        try {
          const data = await authService.resetPassword(token, formData);
          if (data.message) toast.success(data.message);
          if (navigate) navigate("/login");
        } catch (error) {
          if (error.message) toast.error(error.message);
        }
      },

      createStore: async (formData) => {
        try {
          const data = await authService.createStore(formData);
          if (data.message) toast.success(data.message);
        } catch (error) {
          if (error.message) toast.error(error.message);
        }
      },
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
    }
  )
);
