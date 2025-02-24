import { useEffect } from "react";
import { sortState } from "@/config";
import { useSearchParams } from "react-router-dom";
import { useFormSchema } from "@/hooks/useFormSchema";
import ProductCard from "@/components/card/ProductCard";
import SortingBox from "@/components/layout/SortingBox";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import ProductsSkeleton from "@/components/loading/ProductsSkeleton";

const ProductCategory = () => {
  const filterForm = useFormSchema(sortState);
  const { getProducts, products } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    filterForm.setValues((prevValues) => ({
      ...prevValues,
      orderBy: params.orderBy || "asc",
      sortBy: params.sortBy || "",
      page: Number(params.page) > 0 ? Number(params.page) : 1,
    }));
  }, [searchParams]);

  useEffect(() => {
    getProducts(filterForm.values);
  }, [filterForm.values]);

  return (
    <section>
      <div className="container mx-auto">
        <div className="px-2 md:px-6 space-y-6 py-6">
          <PageBreadCrumb />

          <div>
            <div className=" space-y-6">
              <SortingBox setSearchParams={setSearchParams} />
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
