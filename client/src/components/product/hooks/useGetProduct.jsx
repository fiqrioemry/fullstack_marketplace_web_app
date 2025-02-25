import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";

const useGetProduct = () => {
  const { slug } = useParams();
  const { getProduct, product, loading } = useProductStore();

  useEffect(() => {
    getProduct(slug);
  }, [getProduct, slug]);

  return { product, loading };
};

export default useGetProduct;
