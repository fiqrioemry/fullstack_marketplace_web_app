/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category.slug}`}>
      <Card className="h-[225px] overflow-hidden">
        <CardContent>
          <img
            className="w-full object-contain"
            src={
              category.image ||
              "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/12/19/3b8604db-0cd5-410b-b74c-108511796f14.jpg.webp?ect=4g"
            }
            alt="category"
          />
        </CardContent>
      </Card>
      <div className="text-center">
        <h4>{category.name}</h4>
      </div>
    </Link>
  );
};

export default CategoryCard;
