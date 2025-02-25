import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import CategoryCard from "@/components/category/CategoryCard";
import CategoryError from "@/components/category/CategoryError";
import CategoryLoading from "@/components/category/CategoryLoading";

const Category = () => {
  const { getCategories, categories, message } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (categories.length === 0) return <CategoryLoading />;

  if (categories.length === 0 && message)
    return <CategoryError message={message} onRetry={getCategories} />;

  return (
    <section className="min-h-svh">
      <div className="section-margin">
        <CategoryCard categories={categories} />
      </div>
    </section>
  );
};

export default Category;
