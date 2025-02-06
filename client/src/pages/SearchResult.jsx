import { useEffect } from "react";
import { searchState } from "@/config";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/card/ProductCard";
import { useFormSchema } from "@/hooks/useFormSchema";
import FilterBox from "@/components/layout/FilterBox";
import SortingBox from "@/components/layout/SortingBox";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import { PaginationBox } from "@/components/layout/PaginationBox";
import ProductsSkeleton from "@/components/loading/ProductsSkeleton";

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
  }, [searchParams]);

  // Sinkronisasi formik.values ke searchParams
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
    setSearchParams(params);
  }, [setSearchParams, searchForm.values]);

  // Fetch produk ketika searchParams berubah
  useEffect(() => {
    getProducts(Object.fromEntries(searchParams.entries()));
  }, [getProducts, searchParams]);

  return (
    <section>
      <div className="container mx-auto">
        <div className="px-2 md:px-6 space-y-6 py-6">
          <PageBreadCrumb />

          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-12 md:col-span-3">
              <FilterBox searchForm={searchForm} />
            </div>

            <div className="col-span-12 md:col-span-9 space-y-6">
              <div className="flex justify-end">
                <SortingBox searchForm={searchForm} />
              </div>

              {products.length === 0 ? (
                <ProductsSkeleton style="grid_display_4" value={9} />
              ) : loading ? (
                <ProductsSkeleton style="grid_display_4" value={9} />
              ) : (
                <>
                  <div className="grid_display_4">
                    {products.map((product, index) => (
                      <ProductCard product={product} key={index} />
                    ))}
                  </div>
                </>
              )}

              <PaginationBox
                paginate={searchForm}
                totalPage={totalPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
