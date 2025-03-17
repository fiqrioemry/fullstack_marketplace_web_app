import { useEffect, useState } from "react";
import LoadMoreProducts from "./LoadMoreProducts";
import ProductCard from "@/components/card/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import ProductsPreviewLoading from "@/components/loading/ProductsPreviewLoading";

const ProductRecommendation = () => {
  const [limit, setLimit] = useState(5);
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    console.log(limit);
    getProducts({ limit });
  }, [getProducts, limit]);

  if (!products) return <ProductsPreviewLoading />;

  return (
    <div className="space-y-6">
      <h4>Product Recommendation</h4>
      <ProductCard products={products} />
      <LoadMoreProducts limit={limit} setLimit={setLimit} />
    </div>
  );
};

export default ProductRecommendation;
