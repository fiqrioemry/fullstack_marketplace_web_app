import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useProductStore } from "@/store/useProductStore";
import CategoriesLoading from "@/components/loading/CategoriesLoading";

const CategoryCarousel = () => {
  const { getCategories, categories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (categories.length === 0) return <CategoriesLoading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4>Category List</h4>
        <Link to="/category" className="link_animate">
          See all categories
        </Link>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {categories.slice(0, 5).map(({ id, slug, image, name }) => (
            <CarouselItem
              key={id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Link to={`/category/${slug}`}>
                <Card className="p-2">
                  <CardContent className="flex items-center justify-center">
                    <img
                      className="h-40 object-contain"
                      src={image}
                      alt={name}
                    />
                  </CardContent>
                </Card>
                <h4 className="text-center mt-2">{name}</h4>
              </Link>
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
    </div>
  );
};

export default CategoryCarousel;
