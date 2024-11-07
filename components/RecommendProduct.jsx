import React from "react";
import { Button } from "./ui/button";
import ProductCard from "./common/ProductCard";
import SectionHead from "./common/SectionHead";

const RecommendProduct = () => {
  return (
    <section>
      <div className="container mx-auto space-y-6">
        <SectionHead title="Recommend For You" />

        <div className="content-grid">
          <ProductCard content={null} />
        </div>

        <div className="flex-center">
          <Button>LOAD MORE PRODUCTS</Button>
        </div>
      </div>
    </section>
  );
};

export default RecommendProduct;
