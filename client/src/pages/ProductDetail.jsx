import NotFound from "./NotFound";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import ProductLoading from "@/components/loading/ProductLoading";
import ImagesDetail from "@/components/product-detail/ImagesDetail";
import DescriptionDetail from "@/components/product-detail/DescriptionDetail";

const ProductDetail = () => {
  const { slug } = useParams();
  const { getProduct, product } = useProductStore();

  useEffect(() => {
    getProduct(slug);
  }, [getProduct, slug]);

  if (!product) return <ProductLoading />;

  if (product.length === 0) return <NotFound />;

  return (
    <div className="container mx-auto px-2">
      <div className="grid grid-cols-12 gap-4 py-3 md:py-6">
        <ImagesDetail images={product.images} />
        <DescriptionDetail product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
