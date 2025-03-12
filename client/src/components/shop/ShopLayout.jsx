import { useEffect } from "react";
import ShopHeader from "./ShopHeader";
import NotFound from "@/pages/NotFound";
import ShopNavTabs from "./ShopNavTabs";
import { Outlet, useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import ShopLoading from "@/components/loading/ShopLoading";

const ShopLayout = () => {
  const { shopname } = useParams();
  const { getStoreInfo, store } = useProductStore();

  useEffect(() => {
    getStoreInfo(shopname);
  }, [getStoreInfo, shopname]);

  if (!store) return <ShopLoading />;

  if (store.length === 0) return <NotFound />;

  return (
    <main className="h-full py-3 md:py-6">
      <section className="container mx-auto px-2">
        <ShopHeader store={store} />
        <ShopNavTabs shopname={shopname} />
        <Outlet />
      </section>
    </main>
  );
};

export default ShopLayout;
