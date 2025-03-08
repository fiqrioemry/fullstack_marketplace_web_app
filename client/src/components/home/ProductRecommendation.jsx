import ProductCard from "../card/ProductCard";
import LoadMoreProducts from "./LoadMoreProducts";
import useLoadProducts from "@/hooks/useLoadProducts";
import ProductsLoading from "@/components/loading/ProductsLoading";

const ProductRecommendation = () => {
  const { products, loading, handleLoadMore, limit, totalProducts } =
    useLoadProducts();

  if (!products) return <ProductsLoading />;

  return (
    <div className="space-y-6">
      <h4>Product Recommendation</h4>
      <div className="grid-display-5 mb-4">
        <ProductCard products={products} />
      </div>
      <LoadMoreProducts
        limit={limit}
        loading={loading}
        total={totalProducts}
        handleLoad={handleLoadMore}
      />
    </div>
  );
};

export default ProductRecommendation;
