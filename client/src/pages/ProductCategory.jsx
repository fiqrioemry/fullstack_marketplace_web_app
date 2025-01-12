import { useEffect } from "react";
import { initialSearchForm } from "../config";
import SortingBox from "../components/SortingBox";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useHandleForm } from "../hooks/useHandleForm";
import PageBreadCrumb from "../components/PageBreadCrumb";
import { useProductStore } from "../store/useProductStore";
import { ProductPagination } from "../components/ProductPagination";
import ProductsSkeleton from "../components/loading/ProductsSkeleton";

const ProductCategory = () => {
  const { getProducts, products } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const { formData, setFormData } = useHandleForm(initialSearchForm);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFormData({
      order: params.order || "asc",
      sortBy: params.sortBy || "",
      minPrice: params.minPrice || "",
      maxPrice: params.maxPrice || "",
      page: parseInt(params.page) || 1,
    });
  }, [searchParams, setFormData]);

  useEffect(() => {
    getProducts(formData);
  }, [getProducts, formData]);

  return (
    <section>
      <div className="container mx-auto">
        <div className="px-2 md:px-6 space-y-6 py-6">
          <PageBreadCrumb />

          <div>
            <div className=" space-y-6">
              <SortingBox
                setSearchParams={setSearchParams}
                result={formData.query}
              />
              {!products && (
                <ProductsSkeleton style="grid_display_5" value={9} />
              )}
              {products && (
                <div className="space-y-6">
                  <div className="grid_display_5">
                    {products.map((product) => (
                      <ProductCard product={product} key={product.id} />
                    ))}
                  </div>
                  <ProductPagination />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategory;
