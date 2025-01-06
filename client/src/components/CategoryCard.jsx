import { Card, CardContent } from "@/components/ui/card";

const CategoryCard = () => {
  return (
    <>
      <Card className="h-[225px] overflow-hidden">
        <CardContent>
          <img
            className="w-full object-contain"
            src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/12/19/3b8604db-0cd5-410b-b74c-108511796f14.jpg.webp?ect=4g"
            alt=""
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryCard;
