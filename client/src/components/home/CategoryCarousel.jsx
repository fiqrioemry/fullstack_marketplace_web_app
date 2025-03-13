import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import CategoriesLoading from "@/components/loading/CategoriesLoading";

const CategoryCarousel = () => {
  const { getCategories, categories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (!categories) return <CategoriesLoading />;

  return (
    <div className="space-y-4">
      <h4>Category List</h4>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-4">
        {categories.map(({ id, slug, image, name }) => (
          <div className="aspect-square" key={id}>
            <Link to={`/products?category=${slug}`}>
              <div className="p-2 border rounded-lg">
                <img
                  className="aspect-square object-cover"
                  src={image}
                  alt={name}
                />
                <div className="text-center text-[10px] font-normal md:text-sm md:font-medium">
                  {name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
