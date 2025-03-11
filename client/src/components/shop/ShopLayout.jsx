import { useEffect } from "react";
import ShopHeader from "./ShopHeader";
import NotFound from "@/pages/NotFound";
import { useShopStore } from "@/store/useShopStore";
import { Outlet, useParams } from "react-router-dom";
import ShopLoading from "@/components/loading/ShopLoading";
import ShopNavTabs from "./ShopNavTabs";

const ShopLayout = () => {
  const { shopname } = useParams();
  const { getStoreInfo, store } = useShopStore();

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
