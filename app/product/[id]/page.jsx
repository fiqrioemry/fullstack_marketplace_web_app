import React from "react";
import ProductDetails from "@/components/product/ProductDetails";
import ReviewComents from "@/components/product/ReviewComents";
import RelatedProduct from "@/components/product/RelatedProduct";

const page = () => {
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto space-y-8">
        <h4>home / product / details / electronics / product-name</h4>
        <ProductDetails />
        <ReviewComents />
        <RelatedProduct />
      </div>
    </section>
  );
};

export default page;
