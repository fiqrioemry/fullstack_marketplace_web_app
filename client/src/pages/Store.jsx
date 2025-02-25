import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import StoreAbout from "@/components/store/StoreAbout";
import StoreCard from "@/components/store/StoreCard";
import StoreProduct from "@/components/store/StoreProduct";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Store = () => {
  const { getStoreInfo } = useShopStore();

  useEffect(() => {
    getStoreInfo();
  }, [getStoreInfo]);

  return (
    <section className="container mx-auto">
      <div className="space-y-6 py-6 md:px-6 px-2">
        <StoreCard />

        <Tabs defaultValue="about">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="about">About store</TabsTrigger>
            <TabsTrigger value="product">Product Store</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <StoreAbout />
          </TabsContent>
          <TabsContent value="product">
            <StoreProduct />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Store;
