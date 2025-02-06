import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import StoreProducts from "../../components/dashboard/seller/StoreProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "../../components/ui/input";

const StoreProductsLayout = () => {
  const { getStoreProduct } = useShopStore();

  useEffect(() => {
    getStoreProduct();
  }, [getStoreProduct]);

  return (
    <section className="space-y-6">
      <Tabs defaultValue="products" className="w-full px-4">
        <TabsList>
          <TabsTrigger value="products">List Product</TabsTrigger>
          <TabsTrigger value="add">Add Product</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <StoreProducts />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default StoreProductsLayout;
