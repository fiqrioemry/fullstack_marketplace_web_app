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
  const { formData, handleChange } = useHandleForm(initialSearchForm);

  const {
    getProducts,
    getCategories,
    cities,
    categories,
    getCities,
    products,
  } = useProductStore();

  const [filter, setFilter] = useState({
    query: "",
    category: [],
    city: [],
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    order: "",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    const category = queryParams.get("category") || [];
    const city = queryParams.get("city") || [];
    const minPrice = queryParams.get("minPrice") || "";
    const maxPrice = queryParams.get("maxPrice") || "";
    const sortBy = queryParams.get("sortBy") || "";
    const order = queryParams.get("order") || "asc";
    const page = queryParams.get("page") || 1;
    setFilter({
      query,
      category,
      city,
      minPrice,
      maxPrice,
      sortBy,
      page,
      order,
    });
  }, []);

  useEffect(() => {
    getProducts(filter);
    getCities();
    getCategories();
  }, [getCategories, getCities, getProducts, filter]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Checked items:");
  };
  return (
    <section className="container mx-auto">
      <div className="px-2 md:px-6 py-6 md:py-12">
        <div className="grid grid-cols-12 gap-4">
          {/* filter */}
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

          {/* display */}
          <div className="col-span-9">
            <div className="space-y-6">
              {products ? (
                <ProductsSkeleton style="grid_display_4" value={9} />
              ) : (
                <div className="grid_display_4">
                  {[...Array(8)].map((_, index) => (
                    <ProductCard product={index} key={index} />
                  ))}
                </div>
              )}
              <ProductPagination />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
