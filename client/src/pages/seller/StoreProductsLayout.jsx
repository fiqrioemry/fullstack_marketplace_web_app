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
      <Tabs defaultValue="products" className="w-full px-4">
        <TabsList>
          <TabsTrigger value="list products">List Products</TabsTrigger>
          <TabsTrigger value="add">Add Product</TabsTrigger>
        </TabsList>

        <TabsContent value="list products">
          <StoreProducts />
        </TabsContent>
        <TabsContent value="add products">
          Change your password here.
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default StoreProductsLayout;
