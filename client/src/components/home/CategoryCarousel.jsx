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

  if (!categories) return <CategoriesLoading />;

  return (
    <div className="space-y-4">
      <h4>Category List</h4>
      <Carousel className="w-full">
        <CarouselContent>
          {categories.map(({ id, slug, image, name }) => (
            <CarouselItem
              key={id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Link to={`/search?category=${slug}`}>
                <Card className="p-4">
                  <CardContent>
                    <img
                      className="h-40 w-full aspect-square object-cover"
                      src={image}
                      alt={name}
                    />
                    <h5 className="text-center mt-4">{name}</h5>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
