/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatToRupiah } from "@/lib/utils";

const ProductCard = ({ products }) => {
  return (
    <div className="grid-display-5">
      {products.map((product) => (
        <Link to={`/${product.store.slug}/${product.slug}`} key={product.id}>
          <article className="group">
            <div className="overflow-hidden border rounded-lg">
              <img
                className="w-full aspect-square object-contain group-hover:scale-110 duration-300"
                src={product.images}
                alt="product"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mt-2">
                <img
                  className="h-5 w-5 object-cover rounded-full flex-shrink-0"
                  src={product.store.avatar}
                  alt={product.store.name}
                />
                <div className="flex-1 text-xs">
                  {product.store.name.length > 25
                    ? product.store.name.slice(0, 25) + "..."
                    : product.store.name}
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-semibold">
                {product.category}
              </span>
              <h5 className="font-medium">
                {product.name.length > 25
                  ? product.name.slice(0, 25) + "..."
                  : product.name}
              </h5>
              <span className="text-sm">{formatToRupiah(product.price)}</span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
