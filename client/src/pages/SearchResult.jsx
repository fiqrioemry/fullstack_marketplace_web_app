import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFormSchema } from "@/hooks/useFormSchema";
import { searchState } from "@/config";
import SortingBox from "@/components/layout/SortingBox";
import FilterBox from "@/components/layout/FilterBox";
import ProductCard from "@/components/card/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import ProductsLoading from "@/components/loading/ProductsLoading";
import PaginationLayout from "@/components/layout/PaginationLayout";

const SearchResult = () => {
  const { getProducts, products, totalPage, currentPage, loading } =
    useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();

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
  }, [searchForm.values]);

  useEffect(() => {
    getProducts(searchForm.values);
  }, [searchForm.values]);

  return (
    <section className="container mx-auto">
      <div className="px-2 md:px-6 space-y-6 py-6">
        <PageBreadCrumb />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <FilterBox searchForm={searchForm} />
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="flex justify-end mb-4">
              <SortingBox searchForm={searchForm} />
            </div>

            {loading.get && products.length === 0 ? (
              <ProductsLoading />
            ) : products.length > 0 ? (
              <>
                <div className="grid-display-4">
                  <ProductCard products={products} />
                </div>
                <PaginationLayout
                  totalPage={totalPage}
                  searchForm={searchForm}
                  currentPage={currentPage}
                />
              </>
            ) : (
              <div>No Result of products</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
