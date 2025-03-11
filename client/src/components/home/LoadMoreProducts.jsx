/* eslint-disable react/prop-types */
import NoMoreProducts from "./NoMoreProducts";
import { useProductStore } from "@/store/useProductStore";
import ProductsLoading from "@/components/loading/ProductsLoading";

const LoadMoreProducts = ({ setLimit, limit }) => {
  const { totalProducts, loading } = useProductStore();

  const handleLoadMore = () => {
    setLimit((prev) => prev + 5);
  };

  if (loading) return <ProductsLoading />;

  if (limit >= totalProducts) return <NoMoreProducts />;

  return (
    <div>
      <button
        onClick={handleLoadMore}
        className="btn btn-primary rounded-md w-full"
      >
        load more
      </button>
    </div>
  );
};

export default LoadMoreProducts;
