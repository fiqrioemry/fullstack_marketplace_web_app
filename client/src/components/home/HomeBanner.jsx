import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const HomeBanner = () => {
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent>
        {[...Array(3)].map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex items-center justify-center">
                <img
                  className="w-full aspect-ratio rounded-lg"
                  src="https://placehold.co/800x400"
                  alt="banner"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomeBanner;
