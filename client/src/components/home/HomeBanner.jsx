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
  const [direction, setDirection] = useState("forward"); // Menyimpan arah gerakan

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (direction === "forward") {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          setDirection("backward"); // Ubah arah ke mundur saat mencapai akhir
          api.scrollPrevious();
        }
      } else if (direction === "backward") {
        if (api.canScrollPrevious()) {
          api.scrollPrevious();
        } else {
          setDirection("forward"); // Ubah arah ke maju saat mencapai awal
          api.scrollNext();
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [api, direction]); // Tambahkan 'direction' ke dependencies

  return (
    <div className="px-2">
      <div>
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {[...Array(3)].map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center">
                      <img
                        className="w-full h-full"
                        src="https://images.tokopedia.net/img/NsjrJu/2020/9/25/b1d2ed1e-ef80-4d7a-869f-a0394f0629be.jpg?ect=4g"
                        alt="banner"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default HomeBanner;
