import { useEffect, useState } from "react";
import { initialSearchForm } from "../config";
import FilterBoxMobile from "./FilterBoxMobile";
import FilterBox from "../components/FilterBox";
import SortingBox from "../components/SortingBox";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/useProductStore";
import { ProductPagination } from "../components/ProductPagination";
import ProductsSkeleton from "../components/loading/ProductsSkeleton";
import PageBreadCrumb from "../components/PageBreadCrumb";
import CategoryCard from "../components/CategoryCard";

const Category = () => {
  const { getCategories } = useProductStore();

  return (
    <section>
      <div className="container mx-auto">
        <div className="px-2 md:px-6 space-y-6 py-6">
          <PageBreadCrumb />

          <h3>List of Categories</h3>

          <div className="grid_display_5 ">
            <CategoryCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
