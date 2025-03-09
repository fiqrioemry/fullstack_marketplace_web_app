import { useShopStore } from "@/store/useShopStore";
import ProductCard from "@/components/card/ProductCard";
import ProductsLoading from "@/components/loading/ProductsLoading";

const ShopProducts = () => {
  const { products } = useShopStore();

  if (!products) return <ProductsLoading />;

  return (
    <section className="space-y-6">
      <div className="grid-display-5">
        <ProductCard products={products} />
      </div>
    </section>
  );
};

export default ShopProducts;
