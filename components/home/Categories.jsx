import React from "react";
import SectionHead from "../common/SectionHead";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <section>
      <div className="container mx-auto space-y-6">
        <SectionHead title="Product Categories" />
        <div className="content-grid">
          <CategoryCard />
        </div>
      </div>
    </section>
  );
};
export default Categories;
