import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import StoreProducts from "../../components/dashboard/seller/StoreProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StoreProductsLayout = () => {
  const { getStoreProduct } = useShopStore();

  useEffect(() => {
    getStoreProduct();
  }, [getStoreProduct]);

  return (
    <section className="space-y-6">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      <StoreProducts />
    </section>
  );
};

export default StoreProductsLayout;
