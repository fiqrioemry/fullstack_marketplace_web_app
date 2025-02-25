import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import CategoryHead from "@/components/category/CategoryHead";
import CategoryBody from "@/components/category/CategoryBody";
import CategoryLoading from "@/components/category/CategoryLoading";

const Category = () => {
  const { getCategories, categories, loading } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (loading && categories.length === 0) return <CategoryLoading />;

  return (
    <section className="min-h-svh">
      <div className="section-margin">
        <CategoryHead />
        <CategoryBody categories={categories} />
      </div>
    </section>
  );
};

export default Category;
