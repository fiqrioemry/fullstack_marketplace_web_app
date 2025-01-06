import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageBreadCrumb from "../components/PageBreadCrumb";
import ProductImages from "../components/product/ProductImages";
import ProductDescription from "../components/product/ProductDescription";

const ProductDetail = () => {
  const { slug } = useParams();

  useEffect(() => {
    console.log("get product detail");
  }, []);

  return (
    <section>
      <div className="container mx-auto px-2 md:px-6">
        {/* 1. navigation path info */}
        <div className="py-6 lg:py-10 px-2 text-sm ">
          <PageBreadCrumb />
        </div>

        {/* 2. product details image & description */}
        <div className="grid grid-cols-12 gap-4 ">
          <div className=" col-start-1 col-end-13 md:col-start-1 md:col-end-7">
            <ProductImages />
          </div>
          <div className="col-start-1 col-end-13 md:col-start-8 md:col-end-13">
            <ProductDescription />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
