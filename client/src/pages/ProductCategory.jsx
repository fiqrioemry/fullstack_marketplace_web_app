/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFormSchema } from "@/hooks/useFormSchema";
import ProductCard from "@/components/card/ProductCard";
import SortingBox from "@/components/layout/SortingBox";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import ProductsLoading from "../components/loading/ProductsLoading";

const ProductCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts, loading, products } = useProductStore();

  const initialSearchValues = {
    sortBy: searchParams.get("sortBy") || "",
    orderBy: searchParams.get("orderBy") || "",
    page: Number(searchParams.get("page")) || 1,
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
  }, [searchForm.values]);

  useEffect(() => {
    getProducts(searchForm.values);
  }, [searchForm.values]);

  if (loading && products.length === 0) return <ProductsLoading />;

  return (
    <section>
      <div className="section-margin">
        <PageBreadCrumb />
        <div className=" space-y-6">
          <SortingBox searchForm={searchForm} />
          <div className="grid-display-5">
            <ProductCard products={products} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategory;
