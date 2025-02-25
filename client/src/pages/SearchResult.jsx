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

  // Ambil nilai dari URL untuk inisialisasi state
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
  };

  const searchForm = useFormSchema(initialSearchValues);

  // Effect untuk memperbarui URL saat searchForm berubah
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

  // Fetch products setiap kali searchForm berubah
  useEffect(() => {
    getProducts(searchForm.values);
  }, [searchForm.values]);

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
