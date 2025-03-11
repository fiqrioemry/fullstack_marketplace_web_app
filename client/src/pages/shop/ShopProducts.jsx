import { useShopStore } from "@/store/useShopStore";
import ProductCard from "@/components/card/ProductCard";
import ProductsPreviewLoading from "@/components/loading/ProductsPreviewLoading";

const ShopProducts = () => {
  const { products } = useShopStore();

  if (!products) return <ProductsPreviewLoading />;

  return (
    <section className="space-y-6">
      <div className="grid-display-5">
        <ProductCard products={products} />
      </div>
    </section>
  );
};

export default ShopProducts;
