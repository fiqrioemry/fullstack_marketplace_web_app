import { useEffect } from "react";
import { searchState } from "@/config";
import { useSearchParams } from "react-router-dom";
import { useFormSchema } from "@/hooks/useFormSchema";
import SortingBox from "@/components/layout/SortingBox";
import FilterBox from "@/components/layout/FilterBox";
import ProductCard from "@/components/card/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import ProductsLoading from "@/components/loading/ProductsLoading";
import PaginationLayout from "@/components/layout/PaginationLayout";

const SearchResult = () => {
  const searchForm = useFormSchema(searchState);
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts, products, totalPage, currentPage, loading } =
    useProductStore();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    searchForm.setValues({
      search: params.search || "",
      orderBy: params.orderBy || "asc",
      sortBy: params.sortBy || "",
      minPrice: params.minPrice || "",
      maxPrice: params.maxPrice || "",
      page: parseInt(params.page) || 1,
      city: params.city ? params.city.split(",") : [],
      category: params.category ? params.category.split(",") : [],
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(searchForm.values).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          if (value.length > 0) params.set(key, value.join(","));
        } else {
          params.set(key, value);
        }
      }
    });
    getProducts(params.toString());
  }, []);

  return (
    <section>
      <div className="container mx-auto">
        <div className="px-2 md:px-6 space-y-6 py-6">
          <PageBreadCrumb />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <FilterBox searchForm={searchForm} />
          </div>

          <div className="col-span-12 md:col-span-9 space-y-6">
            <div className="flex justify-end">
              <SortingBox searchForm={searchForm} />
            </div>

            {loading.get && products.length === 0 ? (
              <ProductsLoading />
            ) : products.length === 0 ? (
              <div>No Results</div>
            ) : (
              <div>
                <div className="grid-display-4">
                  {products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                  ))}
                </div>

                <PaginationLayout
                  totalPage={totalPage}
                  searchForm={searchForm}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
