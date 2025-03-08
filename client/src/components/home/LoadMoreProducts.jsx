/* eslint-disable react/prop-types */
import NoMoreProducts from "./NoMoreProducts";
import ProductsLoading from "@/components/loading/ProductsLoading";

const LoadMoreProducts = ({ loading, limit, total, handleLoad }) => {
  if (loading) return <ProductsLoading />;

  if (limit >= total) return <NoMoreProducts />;

  return (
    <div>
      <button
        onClick={handleLoad}
        className="w-full flex items-center justify-center gap-4 px-4 py-2 bg-blue-700 disabled:bg-gray-500 hover:bg-blue-500 rounded-md capitalize text-background duration-300"
      >
        load more products
      </button>
    </div>
  );
};

export default LoadMoreProducts;
