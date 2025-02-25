import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";

const useGetProduct = () => {
  const { slug } = useParams();
  const { product, getProduct } = useProductStore();

  useEffect(() => {
    getProduct(slug);
  }, [getProduct, slug]);

  return product;
};

export default useGetProduct;
