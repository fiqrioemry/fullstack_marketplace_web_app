import { useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import PageBreadCrumb from "../components/PageBreadCrumb";
import { useProductStore } from "../store/useProductStore";
import CategoriesSkeleton from "../components/loading/CategoriesSkeleton";

const Category = () => {
  const { getCategories, categories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section>
      <div className="container mx-auto">
        <div className="px-2 md:px-6 space-y-6 py-6">
          <PageBreadCrumb />

          <h3 className="capitalize">List of Product Categories</h3>

          <div className="grid_display_5 ">
            {!categories ? (
              <CategoriesSkeleton />
            ) : (
              [...Array(10)].map((_, index) => (
                <CategoryCard category={index} key={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
