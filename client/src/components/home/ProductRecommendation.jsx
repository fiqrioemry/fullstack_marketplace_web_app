import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "../ProductCard";

const ProductRecommendation = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4>CProduct Recommendation</h4>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <Link to={`/storename/product${index}`} key={index}>
            <ProductCard />
          </Link>
        ))}
      </div>
      <div>
        <Button className="w-full py-6 text-md" size="lg">
          Load more product
        </Button>
      </div>
    </div>
  );
};

export default ProductRecommendation;
