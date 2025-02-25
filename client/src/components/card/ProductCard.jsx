/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const ProductCard = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <Link to={`/${product.storeSlug}/${product.slug}`} key={product.id}>
          <Card className="p-2">
            <CardContent>
              <img
                className="w-full object-contain rounded-md"
                src={product.images}
                alt="product"
              />
              <div className="px-2">
                <span className="text-xs text-muted-foreground font-semibold">
                  {product.categoryName}
                </span>
                <h5>
                  {product.name.length > 25
                    ? product.name.slice(0, 25) + "..."
                    : product.name}
                </h5>
                <span className="text-sm">Rp. {product.price}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default ProductCard;
