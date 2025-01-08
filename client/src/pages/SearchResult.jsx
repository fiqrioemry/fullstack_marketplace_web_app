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
    getProducts(formData);
  }, [getProducts, formData]);

  useEffect(() => {
    getCities();
    getCategories();
  }, [getCategories, getCities]);

  const handleChange = ({ target: { name, value, checked } }) => {
    switch (name) {
      case "minPrice":
        setSearchParams({ ...searchParams, minPrice: value });
        break;
      case "maxPrice":
        setSearchParams({ ...searchParams, minPrice: value });
        break;
      case "sortBy":
        setSearchParams({ ...searchParams, sortBy: value });
        break;
      case "categories":
        updateCategories(value);
        break;

      case "cities":
        updateCities(value);
        break;
      default:
        console.error(`Unknown filter property: ${name}`);
    }
  };

  const updateCities = (value) => {
    const index = searchParams.cities.indexOf(value);
    const updatedCities = [...searchParams.cities];
    if (index > -1) {
      updatedCities.splice(index, 1);
    } else {
      updatedCities.push(value);
    }
    setSearchParams({ ...searchParams, city: updatedCities });
  };

  const updateCategories = () => {};

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
