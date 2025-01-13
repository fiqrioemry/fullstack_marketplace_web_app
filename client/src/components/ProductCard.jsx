/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/${product.storeSlug}/${product.slug}`}>
      <Card className="h-[300px] overflow-hidden">
        <CardContent>
          <img
            className="w-full object-contain"
            src={product.images[0]}
            alt="product"
          />
          <div className="space-y-2 px-2">
            <h4>{product.name}</h4>
            <span>Rp. {product.price}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
