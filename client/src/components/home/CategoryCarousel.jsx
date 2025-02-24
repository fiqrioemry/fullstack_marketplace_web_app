import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import CategoryCard from "@/components/card/CategoryCard";
import { useProductStore } from "@/store/useProductStore";
import CategoriesLoading from "@/components/loading/CategoriesLoading";

const CategoryCarousel = () => {
  const { getCategories, categories, loading } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4>Category List</h4>

        <Link to="/category" className="link_animate">
          See all categories
        </Link>
      </div>
      <div>
        {loading.categories && categories.length === 0 ? (
          <CategoriesLoading />
        ) : (
          <Carousel className="w-full ">
            <CarouselContent>
              {categories.slice(0, 5).map((category) => (
                <CarouselItem
                  key={category.id}
                  className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <CategoryCard category={category} />
                </CarouselItem>
              ))}
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <Link to="/category">
                  <Card className="h-[225px] overflow-hidden">
                    <div className="h-full flex items-center justify-center hover:bg-muted-foreground/25 duration-300 transition-all">
                      <h4>See All Categories</h4>
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default CategoryCarousel;
