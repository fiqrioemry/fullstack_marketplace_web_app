/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const CategoryBody = ({ categories }) => {
  return (
    <div className="grid-display-5">
      {categories.map((category) => (
        <Link to={`/category/${category.slug}`} key={category.id}>
          <Card className=" p-2">
            <CardContent className=" flex items-center justify-center">
              <img
                className=" object-contain"
                src={category.image}
                alt="category"
              />
            </CardContent>
          </Card>
          <h4 className="text-center mt-2">{category.name}</h4>
        </Link>
      ))}
    </div>
  );
};

export default CategoryBody;
