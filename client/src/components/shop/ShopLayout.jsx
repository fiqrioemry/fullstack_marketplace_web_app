import { useEffect } from "react";
import ShopHeader from "./ShopHeader";
import NotFound from "@/pages/NotFound";
import { useShopStore } from "@/store/useShopStore";
import ShopLoading from "@/components/loading/ShopLoading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const ShopLayout = () => {
  const location = useLocation();
  const { shopname } = useParams();
  const { getStoreInfo, store } = useShopStore();
  const currentPath = location.pathname.split("/").pop();

  useEffect(() => {
    getStoreInfo(shopname);
  }, [getStoreInfo, shopname]);

  if (!store) return <ShopLoading />;

  if (store.length === 0) return <NotFound />;

  return (
    <main className="h-full py-3 md:py-6">
      <section className="container mx-auto px-2">
        {/* header */}
        <div className="mb-6">
          <ShopHeader store={store} />
        </div>

        {/* navigation */}
        <Tabs className="mb-6" defaultValue={currentPath}>
          <TabsList className="justify-between md:justify-start">
            <TabsTrigger className="w-full" value={shopname} asChild>
              <Link to=".">Beranda</Link>
            </TabsTrigger>

            <TabsTrigger
              className="w-full"
              value={`${shopname}/products`}
              asChild
            >
              <Link to="products">Products</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* display */}
        <div className="mb-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default ShopLayout;
