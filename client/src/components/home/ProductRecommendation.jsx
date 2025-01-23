import ProductCard from "../ProductCard";
import { useEffect, useState } from "react";
import ButtonAnimate from "../ButtonAnimate";
import ProductsSkeleton from "../loading/ProductsSkeleton";
import { useProductStore } from "../../store/useProductStore";
import useResponsiveCount from "../../hooks/useResponsiveCount";

const ProductRecommendation = () => {
  const [limit, setLimit] = useState(5);
  const { getProducts, products, isProductLoading } = useProductStore();

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  useEffect(() => {
    getProducts(limit);
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
          {isProductLoading && <ProductsSkeleton />}
          <ButtonAnimate
            action={handleShowMore}
            loading={isProductLoading}
            title={"Load More Product"}
            style={"w-full py-6 text-md"}
          />
        </div>
      )}
    </div>
  );
};

export default ProductRecommendation;
