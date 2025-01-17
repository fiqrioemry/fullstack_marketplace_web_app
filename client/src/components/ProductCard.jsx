/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/${product.storeSlug}/${product.slug}`}>
      <Card className="h-[315px] overflow-hidden">
        <CardContent>
          <img
            className="w-full object-contain"
            src={product.images[0]}
            alt="product"
          />
          <div className="px-2">
            <span className="text-xs text-muted-foreground font-semibold">
              {product.category}
            </span>
            <h5>{product.name}</h5>
            <span className="text-sm">Rp. {product.price}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
