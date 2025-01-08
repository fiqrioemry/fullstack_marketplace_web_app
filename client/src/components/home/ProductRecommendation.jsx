import ProductCard from "../ProductCard";
import { useEffect, useState } from "react";
import ButtonAnimate from "../ButtonAnimate";
import ProductsSkeleton from "../loading/ProductsSkeleton";
import { useProductStore } from "../../store/useProductStore";
import useResponsiveCount from "../../hooks/useResponsiveCount";

const ProductRecommendation = () => {
  const count = useResponsiveCount();
  const [limit, setLimit] = useState(null);
  const { getProducts, products, isProductLoading } = useProductStore();

  console.log(isProductLoading);
  useEffect(() => {
    setLimit(count);
  }, [count]);

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + count);
  };

  useEffect(() => {
    if (limit) {
      getProducts(limit);
    }
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
            {[...Array(products)].map((_, index) => (
              <ProductCard product={index} key={index} />
            ))}
          </div>
          {isProductLoading && <ProductsSkeleton />}
          <ButtonAnimate
            title={"Load More Product"}
            action={handleShowMore}
            style={"w-full py-6 text-md"}
            loading={isProductLoading}
          />
        </div>
      )}
    </div>
  );
};

export default ProductRecommendation;
