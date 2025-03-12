import ProductCard from "@/components/card/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import ProductsPreviewLoading from "@/components/loading/ProductsPreviewLoading";

const ShopProducts = () => {
  const { products } = useProductStore();

  if (!products) return <ProductsPreviewLoading />;

  return (
    <section className="space-y-6">
      <ProductCard products={products} />
    </section>
  );
};

export default ShopProducts;
