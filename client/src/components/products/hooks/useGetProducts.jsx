import { useEffect } from "react";
import { searchState } from "@/config";
import { useSearchParams } from "react-router-dom";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useProductStore } from "@/store/useProductStore";

export const useGetProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts, products, totalPage, currentPage, loading } =
    useProductStore();

  const initialSearchValues = {
    ...searchState,
    search: searchParams.get("search") || "",
    category: searchParams.getAll("category") || [],
    city: searchParams.getAll("city") || [],
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sortBy: searchParams.get("sortBy") || "",
    orderBy: searchParams.get("orderBy") || "",
    page: Number(searchParams.get("page")) || 1,
    limit: 8,
  };

  const searchForm = useFormSchema(initialSearchValues);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    Object.entries(searchForm.values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => newSearchParams.append(key, val));
      } else if (value !== "" && value !== null) {
        newSearchParams.set(key, value);
      }
    });
    setSearchParams(newSearchParams);
  }, [searchForm.values, setSearchParams]);

  useEffect(() => {
    getProducts(searchForm.values);
  }, [searchForm.values, getProducts]);

  return { searchForm, products, totalPage, currentPage, loading };
};
