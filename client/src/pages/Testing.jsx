/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { searchState } from "@/config";
import { useSearchParams } from "react-router-dom";
import { useFormSchema } from "@/hooks/useFormSchema";
import ProductCard from "@/components/card/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import ProductsFilter from "@/components/products-preview/ProductsFilter";
import ProductsSorting from "@/components/products-preview/ProductsSorting";
import ProductsNotFound from "@/components/products-preview/ProductsNotFound";
import ProductsPreviewLoading from "@/components/loading/ProductsPreviewLoading";
import ProductsPagination from "@/components/products-preview/ProductsPagination";
import TestingFilter from "./TestingFilter";

const ProductsPreview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts, products, totalPage, currentPage } = useProductStore();

  const initialSearchValues = {
    ...searchState,
    search: searchParams.get("search") || "",
    category: searchParams.get("category")
      ? searchParams.get("category").split(",")
      : [],
    city: searchParams.get("city") ? searchParams.get("city").split(",") : [],
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sortBy: searchParams.get("sortBy") || "",
    orderBy: searchParams.get("orderBy") || "",
  };

  const searchForm = useFormSchema(getProducts, initialSearchValues);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    Object.entries(searchForm.values).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        newSearchParams.set(key, value.join(","));
      } else if (value && value !== "") {
        newSearchParams.set(key, value);
      }
    });

    setSearchParams(newSearchParams);
  }, [searchForm.values]);

  useEffect(() => {
    searchForm.setValues((prev) => ({
      ...prev,
      page: 1,
    }));
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    getProducts(params);
  }, [searchParams]);

  if (!products) return <ProductsPreviewLoading />;

  return (
    <div className="container mx-auto">
      <div className="px-2 py-3 md:py-6 space-y-4">
        <PageBreadCrumb />
        <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 gap-0 pt-2">
          <div className="col-span-1 mb-4 md:mb-0">
            <TestingFilter form={searchForm} />
          </div>
          <div className="col-span-4">
            <ProductCard products={products} />
            <ProductsPagination
              totalPage={totalPage}
              searchForm={searchForm}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPreview;
