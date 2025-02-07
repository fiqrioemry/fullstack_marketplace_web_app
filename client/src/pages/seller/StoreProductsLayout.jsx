import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import { storeProductFilterState as filterParams } from "@/config";
import StoreProducts from "@/components/dashboard/seller/StoreProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddStoreProducts from "@/components/dashboard/seller/AddStoreProducts";

const StoreProductsLayout = () => {
  const { getStoreProduct } = useShopStore();

  useEffect(() => {
    getStoreProduct(filterParams);
  }, [getStoreProduct]);

  return (
    <section className="space-y-6">
      <Tabs defaultValue="list products" className="w-full px-4">
        <TabsList>
          <TabsTrigger value="list products">List Products</TabsTrigger>
          <TabsTrigger value="add products">Add Product</TabsTrigger>
        </TabsList>

        <TabsContent value="list products">
          <StoreProducts />
        </TabsContent>
        <TabsContent value="add products">
          <AddStoreProducts />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default StoreProductsLayout;
