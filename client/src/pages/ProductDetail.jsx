import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import ProductDisplay from "@/components/product/ProductDisplay";
import ProductDisplayLoading from "@/components/loading/ProductDisplayLoading";

const ProductDetail = () => {
  const { slug } = useParams();
  const { product, getProduct } = useProductStore();

  useEffect(() => {
    getProduct(slug);
  }, []);

  return (
    <section>
      <div className="container mx-auto ">
        <div className="px-2 md:px-6 space-y-6 py-6">
          {/* 1. page breadcrumb*/}
          <PageBreadCrumb />
          {/* 2. product details */}
          {product.length === 0 && <ProductDisplayLoading />}
          {product && product.length !== 0 && (
            <ProductDisplay product={product} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
