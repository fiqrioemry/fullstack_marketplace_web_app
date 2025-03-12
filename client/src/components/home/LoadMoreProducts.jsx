/* eslint-disable react/prop-types */
import { useProductStore } from "@/store/useProductStore";
import ProductsPreviewLoading from "@/components/loading/ProductsPreviewLoading";

const LoadMoreProducts = ({ setLimit, limit }) => {
  const { totalData, loading } = useProductStore();

  const handleLoadMore = () => {
    setLimit((prev) => prev + 5);
  };

  if (limit >= totalData) return null;

  if (loading) return <ProductsPreviewLoading />;

  return (
    <button onClick={handleLoadMore} className="btn btn-primary  w-full">
      load more
    </button>
  );
};

export default LoadMoreProducts;
