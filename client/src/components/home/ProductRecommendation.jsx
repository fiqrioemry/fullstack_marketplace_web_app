import { useEffect, useState } from "react";
import ProductCard from "@/components/card/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import ProcessButton from "@/components/form/processButton";
import ProductsSkeleton from "@/components/loading/ProductsSkeleton";

const ProductRecommendation = () => {
  const [limit, setLimit] = useState(10);
  const { getProducts, products, loading, totalData } = useProductStore();

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  useEffect(() => {
    getProducts({ limit: limit });
  }, [getProducts, limit]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4>Product Recommendation</h4>
      </div>
      {!products ? (
        <ProductsSkeleton />
      ) : (
        <div className="space-y-6">
          <div className="grid_display_5">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          {/* {loading && <ProductsSkeleton />} */}
          {limit <= totalData && (
            <ProcessButton
              onClick={handleShowMore}
              loading={loading}
              title={"Load More Product"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductRecommendation;
