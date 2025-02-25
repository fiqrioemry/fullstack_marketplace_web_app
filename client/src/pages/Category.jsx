import { useEffect } from "react";
import CategoryCard from "@/components/card/CategoryCard";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import CategoriesLoading from "@/components/loading/CategoriesLoading";

const Category = () => {
  const { getCategories, categories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (categories.length === 0) return <CategoriesLoading />;

  return (
    <section className="min-h-svh">
      <div className="section-margin">
        <PageBreadCrumb />
        <h4>List of Product Categories</h4>
        <div className="grid-display-5">
          <CategoryCard categories={categories} />
        </div>
      </div>
    </section>
  );
};

export default Category;
