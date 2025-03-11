import { useEffect, useState } from "react";
import LoadMoreProducts from "./LoadMoreProducts";
import ProductCard from "@/components/card/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import ProductsLoading from "@/components/loading/ProductsLoading";

const ProductRecommendation = () => {
  const [limit, setLimit] = useState(5);
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    getProducts({ limit });
  }, [getProducts, limit]);

  if (!products) return <ProductsLoading />;

  return (
    <div className="space-y-6">
      <h4>Product Recommendation</h4>
      <ProductCard products={products} />
      <LoadMoreProducts limit={limit} setLimit={setLimit} />
    </div>
  );
};

export default ProductRecommendation;
