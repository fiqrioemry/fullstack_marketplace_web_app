import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category}`}>
      <Card className="h-[225px] overflow-hidden">
        <CardContent>
          <img
            className="w-full object-contain"
            src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/12/19/3b8604db-0cd5-410b-b74c-108511796f14.jpg.webp?ect=4g"
            alt=""
          />
        </CardContent>
      </Card>
      <div className="text-center">
        <h4>Electronics {category}</h4>
      </div>
    </Link>
  );
};

export default CategoryCard;
