import { useEffect, useState } from "react";
import { initialSearchForm } from "../config";
import { useLocation } from "react-router-dom";
import FilterBox from "../components/FilterBox";
import ProductCard from "../components/ProductCard";
import { useHandleForm } from "../hooks/useHandleForm";
import { useProductStore } from "../store/useProductStore";
import { ProductPagination } from "../components/ProductPagination";
import ProductsSkeleton from "../components/loading/ProductsSkeleton";

const SearchResult = () => {
  const location = useLocation();
  const { formData, setFormData, handleChange } =
    useHandleForm(initialSearchForm);

  const {
    getProducts,
    getCategories,
    cities,
    categories,
    getCities,
    products,
  } = useProductStore();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setFormData((prev) => ({
      ...prev,
      query: queryParams.get("query") || "",
      sortBy: queryParams.get("sortBy") || "",
      order: queryParams.get("order") || "asc",
      minPrice: queryParams.get("minPrice") || "",
      maxPrice: queryParams.get("maxPrice") || "",
      cities: queryParams.get("cities")?.split(",") || [],
      page: parseInt(queryParams.get("page")) || 1, // default to page 1
      categories: queryParams.get("categories")?.split(",") || [],
    }));
  }, [location, setFormData]);

  useEffect(() => {
    console.log(formData);
    getProducts(formData);
    getCities();
    getCategories();
  }, [getCategories, getCities, getProducts, formData]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
                handleSubmit={handleSubmit}
                cities={cities}
                categories={categories}
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
