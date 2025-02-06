import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import ProfileLoading from "@/components/loading/ProfileLoading";
import StoreProducts from "@/components/dashboard/seller/StoreProducts";

const StoreProductsLayout = () => {
  const { getStoreProduct, products, loading } = useShopStore();

  useEffect(() => {
    getStoreProduct({ limit: 10 });
  }, [getStoreProduct]);

  return (
    <section className="space-y-6">
      {loading ? <ProfileLoading /> : <StoreProducts products={products} />}
    </section>
  );
};

export default StoreProductsLayout;
