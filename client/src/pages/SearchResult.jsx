import { useEffect, useState } from "react";
import { initialSearchForm } from "../config";
import FilterBox from "../components/FilterBox";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/useProductStore";
import { ProductPagination } from "../components/ProductPagination";
import ProductsSkeleton from "../components/loading/ProductsSkeleton";

const SearchResult = () => {
  const { getProducts, products } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState(initialSearchForm);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFormData({
      query: params.query || "",
      order: params.order || "asc",
      sortBy: params.sortBy || "",
      minPrice: params.minPrice || "",
      maxPrice: params.maxPrice || "",
      page: parseInt(params.page) || 1,
      city: params.city ? params.city.split(",") : [],
      category: params.category ? params.category.split(",") : [],
    });
  }, [searchParams]);

  useEffect(() => {
    getProducts(formData);
  }, [getProducts, formData]);

  const handleFilterChange = ({ target: { name, value } }) => {
    const params = Object.fromEntries(searchParams.entries());

    const arrayParams = ["city", "category"];

    if (arrayParams.includes(name)) {
      const currentValues = params[name] ? params[name].split(",") : [];

      if (currentValues.includes(value)) {
        params[name] = currentValues.filter((item) => item !== value).join(",");
      } else {
        params[name] = [...currentValues, value].join(",");
      }
    } else {
      params[name] = value;
    }

    if (!params[name]) {
      delete params[name];
    }

    setSearchParams(params);
  };

  return (
    <section className="container mx-auto">
      <div className="px-2 md:px-6 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Filter */}
          <div className="col-span-3">
            <FilterBox
              formData={formData}
              handleFilterChange={handleFilterChange}
            />
          </div>

          {/* Display */}
          <div className="col-span-9">
            <div className="space-y-6">
              {!products ? (
                <ProductsSkeleton style="grid_display_4" value={9} />
              ) : (
                <>
                  <div className="grid_display_4">
                    {[...Array(8)].map((_, index) => (
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
