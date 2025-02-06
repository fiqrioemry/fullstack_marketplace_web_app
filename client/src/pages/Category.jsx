import { Fragment, useEffect } from "react";
import CategoryCard from "@/components/card/CategoryCard";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import CategoriesSkeleton from "@/components/loading/CategoriesCarouselLoading";

const Category = () => {
  const { getCategories, categories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <section>
      <div className="container mx-auto">
        <div className="px-2 md:px-6 space-y-6 py-6">
          <PageBreadCrumb />

          <h3 className="capitalize">List of Product Categories</h3>

          <div className="grid_display_5 ">
            {!categories && <CategoriesSkeleton />}

            {categories && (
              <Fragment>
                {categories.map((category) => (
                  <CategoryCard category={category} key={category.id} />
                ))}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
