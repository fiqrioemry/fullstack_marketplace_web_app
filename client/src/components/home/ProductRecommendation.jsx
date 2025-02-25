import { useEffect, useState } from "react";
import ProductCard from "@/components/card/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import ProcessButton from "@/components/form/processButton";
import ProductsLoading from "@/components/loading/ProductsLoading";

const ProductRecommendation = () => {
  const [limit, setLimit] = useState(5);
  const { getProducts, products, loading, totalData } = useProductStore();

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  useEffect(() => {
    getProducts({ limit });
  }, [getProducts, limit]);

  if (products.length === 0) return <ProductsLoading />;

  return (
    <div className="space-y-6">
      <h4>Product Recommendation</h4>
      <div className="grid-display-5 mb-4">
        <ProductCard products={products} />
      </div>
      {loading && products.length > 0 && <ProductsLoading />}
      {limit <= totalData ? (
        <ProcessButton
          loading={loading}
          onClick={handleShowMore}
          title={"Load More Product"}
        />
      ) : (
        <div className="text-center mt-4">
          <div>Sorry, You have reach the end</div>
          <h4>No more products to show</h4>
        </div>
      )}
    </div>
  );
};

export default ProductRecommendation;
