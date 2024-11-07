"use client";
import React from "react";
import ProductCard from "../common/ProductCard";
import SectionHead from "../common/SectionHead";

const RelatedProduct = () => {
  return (
    <div className="space-y-4">
      <SectionHead title="Related Product" />

      <div className="content-grid">
        <ProductCard />
      </div>
    </div>
  );
};

export default RelatedProduct;
