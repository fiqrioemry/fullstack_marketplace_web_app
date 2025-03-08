import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";

const useLoadProducts = () => {
  const [limit, setLimit] = useState(5);
  const { products, getProducts, totalProducts, loading } = useProductStore();

  const handleLoadMore = () => {
    setLimit((prev) => prev + 5);
  };

  useEffect(() => {
    getProducts({ limit });
  }, [getProducts, limit]);

  return {
    limit,
    loading,
    products,
    totalProducts,
    handleLoadMore,
  };
};

export default useLoadProducts;
