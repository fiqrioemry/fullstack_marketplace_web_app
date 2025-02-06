import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import ProductRelated from "@/components/product/ProductRelated";
import ProductDisplay from "@/components/product/ProductDisplay";
import ProductsSkeleton from "@/components/loading/ProductsSkeleton";
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
          {/* 3. product related
          {product.length === 0 && <ProductsSkeleton />}
          {products && products.length !== 0 && (
            <ProductRelated products={products} />
          )} */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
