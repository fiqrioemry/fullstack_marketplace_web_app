import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";

export const useShopStore = create((set) => ({
  shopProducts: null,
  isShopLoading: null,

  getShopProduct: async (slug) => {
    try {
      const response = axiosInstance.get(`/shop/product/${slug}`);
      set({ shopProducts: response.data.data });
    } catch (error) {
      console.log(error);
      set({ product: null });
    }
  },

  createProduct: async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("categoryId", data.categoryId);
    formData.append("description", data.description);

    Array.from(data.files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      set({ isShopLoading: true });

      const response = await axiosInstance.post("/store/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isShopLoading: false });
    }
  },

  updateProduct: async (productId) => {
    try {
      const data = console.log(productId);
      set({ products: data });
    } catch (error) {
      console.error(error);
      set({ products: [] });
    }
  },

  deleteProduct: async (productId) => {
    try {
      const data = console.log(productId);
      set({ products: data });
    } catch (error) {
      console.error(error);
      set({ products: [] });
    }
  },
}));
