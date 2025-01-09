import { useParams } from "react-router-dom";
import PageBreadCrumb from "../components/PageBreadCrumb";
import ProductImages from "../components/product/ProductImages";
import ProductRelated from "../components/product/ProductRelated";
import ProductDescription from "../components/product/ProductDescription";

const ProductDetail = () => {
  const { slug } = useParams();

  return (
    <section>
      <div className="container mx-auto ">
        <div className="px-2 md:px-6 space-y-6 py-6">
          {/* 1. page breadcrumb*/}
          <div>
            <PageBreadCrumb />
          </div>
          {/* 2. product details */}
          <div className="grid grid-cols-12 gap-4 ">
            <div className=" col-start-1 col-end-13 md:col-start-1 md:col-end-7">
              <ProductImages />
            </div>
            <div className="col-start-1 col-end-13 md:col-start-8 md:col-end-13">
              <ProductDescription />
            </div>
          </div>

          {/* 3. product related */}
          <div>
            <ProductRelated />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
