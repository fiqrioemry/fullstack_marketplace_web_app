/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category.slug}`}>
      <Card className="p-2">
        <CardContent className="flex items-center justify-center">
          <img
            className="h-40 object-contain"
            src={category.image}
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
