import { useEffect } from "react";
import CategoryCard from "@/components/card/CategoryCard";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import CategoriesLoading from "@/components/loading/CategoriesLoading";

const Category = () => {
  const { getCategories, categories, loading } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <section className="min-h-svh">
      <div className="container mx-auto">
        <div className="px-2 md:px-6 space-y-6 py-6">
          <PageBreadCrumb />

          <h3>List of Product Categories</h3>

          {loading.categories && categories.length === 0 ? (
            <CategoriesLoading />
          ) : (
            <div className="grid-display-5">
              {categories.map((category) => (
                <CategoryCard category={category} key={category.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Category;
