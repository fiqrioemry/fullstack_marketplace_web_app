import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageBreadCrumb from "../components/PageBreadCrumb";
import { useProductStore } from "../store/useProductStore";
import ProductRelated from "../components/product/ProductRelated";
import ProductDisplay from "../components/product/ProductDisplay";
import ProductDisplaySkeleton from "../components/loading/ProductDisplaySkeleton";

const ProductDetail = () => {
  const { slug } = useParams();
  const { product, getProduct } = useProductStore();

  useEffect(() => {
    getProduct(slug);
  }, [getProduct, slug]);

  return (
    <section>
      <div className="container mx-auto ">
        <div className="px-2 md:px-6 space-y-6 py-6">
          {/* 1. page breadcrumb*/}
          <PageBreadCrumb />

          {/* 2. product details */}
          {!product && <ProductDisplaySkeleton />}
          {product && product.length !== 0 && (
            <ProductDisplay product={product[0]} />
          )}

          {/* 3. product related */}
          <ProductRelated />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
