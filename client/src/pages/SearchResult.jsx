import { useEffect } from "react";
import FilterBox from "../components/FilterBox";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useHandleForm } from "../hooks/useHandleForm";
import { useProductStore } from "../store/useProductStore";
import { ProductPagination } from "../components/ProductPagination";
import ProductsSkeleton from "../components/loading/ProductsSkeleton";
import { initialSearchForm } from "../config";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    getProducts,
    getCategories,
    cities,
    categories,
    getCities,
    products,
  } = useProductStore();

  const { formData, setFormData, handleChange } =
    useHandleForm(initialSearchForm);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      query: searchParams.get("query") || "",
      categories: searchParams.get("categories")?.split(",") || [],
      cities: searchParams.get("cities")?.split(",") || [],
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sortBy: searchParams.get("sortBy") || "",
      order: searchParams.get("order") || "asc",
      page: parseInt(searchParams.get("page")) || 1,
    }));
  }, [searchParams, setFormData]);

  useEffect(() => {
    const updatedParams = new URLSearchParams();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        updatedParams.set(key, value.join(","));
      } else if (value) {
        updatedParams.set(key, value);
      }
    });

    setSearchParams(updatedParams);
  }, [formData, setSearchParams]);

  useEffect(() => {
    getProducts(formData);
  }, [getProducts, formData]);

  useEffect(() => {
    getCities();
    getCategories();
  }, [getCategories, getCities]);

  return (
    <section className="container mx-auto">
      <div className="px-2 md:px-6 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Filter */}
          <div className="col-span-3">
            {!categories && !cities ? null : (
              <FilterBox
                formData={formData}
                handleChange={handleChange}
                cities={cities}
                categories={categories}
                setFormData={setFormData}
              />
            )}
          </div>

          {/* Display */}
          <div className="col-span-9">
            <div className="space-y-6">
              {!products ? (
                <ProductsSkeleton style="grid_display_4" value={9} />
              ) : (
                <>
                  <div className="grid_display_4">
                    {[...Array(products.data)].map((_, index) => (
                      <ProductCard product={index} key={index} />
                    ))}
                  </div>

                  <ProductPagination page={products.page} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
