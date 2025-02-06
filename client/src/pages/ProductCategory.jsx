import { useEffect } from "react";
import { searchState } from "@/config";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/card/ProductCard";
import { useHandleForm } from "@/hooks/useHandleForm";
import SortingBox from "@/components/layout/SortingBox";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import ProductsSkeleton from "@/components/loading/ProductsSkeleton";

const ProductCategory = () => {
  const { getProducts, products } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const { formData, setFormData } = useHandleForm(searchState);
  console.log(formData);
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    console.log(params.slug);
    setFormData({
      category: params.slug || "",
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
