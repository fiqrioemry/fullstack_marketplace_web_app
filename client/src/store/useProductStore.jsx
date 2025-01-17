import { create } from "zustand";

export const useProductStore = create((set) => ({
  search: null,
  product: null,
  products: null,
  recommend: null,
  categories: [],
  cities: [],
  isSearchLoading: false,
  isProductLoading: false,

  getCities: async () => {
    try {
      const response = [
        { id: 1, name: "Medan" },
        { id: 2, name: "Jakarta" },
        { id: 3, name: "Bandung" },
        { id: 4, name: "Semarang" },
        { id: 5, name: "Surabaya" },
      ];
      set({ cities: response });
    } catch (error) {
      console.error(error);
      set({ cities: [] });
    }
  },

  getCategories: async () => {
    try {
      const response = [
        {
          id: 1,
          name: "Beauty",
          slug: "beauty",
          image: "https://placehold.co/400",
        },
        {
          id: 2,
          name: "Fashion",
          slug: "fashion",
          image: "https://placehold.co/400",
        },
        {
          id: 3,
          name: "Electronics",
          slug: "electronics",
          image: "https://placehold.co/400",
        },
        {
          id: 4,
          name: "Home & Living",
          slug: "home-living",
          image: "https://placehold.co/400",
        },
        {
          id: 5,
          name: "Food & Beverages",
          slug: "food-beverages",
          image: "https://placehold.co/400",
        },
      ];

      set({ categories: response });
    } catch (error) {
      console.error(error);
      set({ categories: [] });
    }
  },

  searchProducts: async () => {
    try {
      set({ isSearchLoading: true });
      const response = ["products"];
      set({ search: response });
    } catch (error) {
      console.log(error);
      set({ search: [] });
    } finally {
      set({ isSearchLoading: false });
    }
  },

  getProduct: async (slug) => {
    try {
      const data = [
        {
          id: 1,
          category: "Electronic",
          name: "Samsung A5",
          slug: "samsung_a5",
          price: 125000,
          stock: 10,
          storeSlug: "random_store_a",
          storeName: "random store A",
          images: [
            "https://placehold.co/400",
            "https://placehold.co/600",
            "https://placehold.co/400",
            "https://placehold.co/400",
          ],
        },
        {
          id: 2,
          category: "Electronic",
          name: "Winter Jacket Radiant",
          slug: "winter_jacket_radiant",
          price: 725000,
          stock: 15,
          storeSlug: "random_store_b",
          storeName: "random store B",
          images: [
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
          ],
        },
        {
          id: 3,
          category: "Electronic",
          name: "Sharp Smart TV 40 Inch",
          slug: "sharp_smart_tv_40_inch",
          price: 345000,
          stock: 20,
          storeSlug: "random_store_c",
          storeName: "random store C",
          images: [
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
          ],
        },
        {
          id: 4,
          category: "Electronic",
          name: "Electric Sound System",
          slug: "electric_sound_system",
          storeSlug: "random_store_d",
          storeName: "random store D",
          price: 617000,
          stock: 32,
          images: [
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
          ],
        },
        {
          id: 5,
          category: "Electronic",
          name: "T-Shirt New Balance",
          slug: "t_shirt_new_balance",
          storeSlug: "random_store_e",
          storeName: "random store E",
          price: 1265000,
          stock: 7,
          images: [
            "https://placehold.co/400",
            "https://placehold.co/600",
            "https://placehold.co/400",
            "https://placehold.co/400",
          ],
        },
      ];

      const response = data.filter((item) => item.slug === slug);
      set({ product: response });
    } catch (error) {
      console.log(error);
      set({ product: null });
    }
  },

  getProducts: async () => {
    try {
      const data = [
        {
          id: 1,
          category: "Electronic",
          name: "Samsung A5",
          slug: "samsung_a5",
          price: 125000,
          stock: 10,
          storeSlug: "random_store_a",
          storeName: "random store A",
          images: [
            "https://placehold.co/400",
            "https://placehold.co/600",
            "https://placehold.co/400",
            "https://placehold.co/400",
          ],
        },
        {
          id: 2,
          category: "Fashion",
          name: "Winter Jacket Radiant",
          slug: "winter_jacket_radiant",
          price: 725000,
          stock: 15,
          storeSlug: "random_store_b",
          storeName: "random store B",
          images: [
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
          ],
        },
        {
          id: 3,
          category: "Electronic",
          name: "Sharp Smart TV 40 Inch",
          slug: "sharp_smart_tv_40_inch",
          price: 345000,
          stock: 20,
          storeSlug: "random_store_c",
          storeName: "random store C",
          images: [
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
          ],
        },
        {
          id: 4,
          category: "Electronic",
          name: "Electric Sound System",
          slug: "electric_sound_system",
          storeSlug: "random_store_d",
          storeName: "random store D",
          price: 617000,
          stock: 32,
          images: [
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
            "https://placehold.co/400",
          ],
        },
        {
          id: 5,
          category: "Fashion",
          name: "T-Shirt New Balance",
          slug: "t_shirt_new_balance",
          storeSlug: "random_store_e",
          storeName: "random store E",
          price: 1265000,
          stock: 7,
          images: [
            "https://placehold.co/400",
            "https://placehold.co/600",
            "https://placehold.co/400",
            "https://placehold.co/400",
          ],
        },
      ];

      set({ products: data });
    } catch (error) {
      console.error(error);
      set({ products: [] });
    } finally {
      set({ isProductLoading: false });
    }
  },
}));
