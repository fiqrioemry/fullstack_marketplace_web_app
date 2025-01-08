import { useEffect, useState } from "react";
import { initialSearchForm } from "../config";
import FilterBox from "../components/FilterBox";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/useProductStore";
import { ProductPagination } from "../components/ProductPagination";
import ProductsSkeleton from "../components/loading/ProductsSkeleton";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState(initialSearchForm);
  const {
    getProducts,
    getCategories,
    cities,
    categories,
    getCities,
    products,
  } = useProductStore();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFormData({
      query: params.query || "",
      order: params.order || "asc",
      sortBy: params.sortBy || "",
      minPrice: params.minPrice || "",
      maxPrice: params.maxPrice || "",
      page: parseInt(params.page) || 1,
      cities: params.cities ? params.cities.split(",") : [],
      categories: params.categories ? params.categories.split(",") : [],
    });
  }, [searchParams]);

  useEffect(() => {
    getProducts(formData);
  }, [getProducts, formData]);

  useEffect(() => {
    getCities();
    getCategories();
  }, [getCategories, getCities]);

  const handleFilterChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      if (Array.isArray(updatedFormData[name])) {
        if (updatedFormData[name].includes(value)) {
          updatedFormData[name] = updatedFormData[name].filter(
            (item) => item !== value
          );
        } else {
          updatedFormData[name].push(value);
        }
      } else {
        updatedFormData[name] = value;
      }

      // Update search params
      const params = new URLSearchParams();
      Object.entries(updatedFormData).forEach(([k, v]) => {
        if (Array.isArray(v) && v.length > 0) {
          params.set(k, v.join(","));
        } else if (v) {
          params.set(k, v);
        }
      });

      setSearchParams(params);

      return updatedFormData; // Return updated formData
    });

    // Fetch updated products
    getProducts(formData);
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
                handleChange={handleFilterChange}
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
