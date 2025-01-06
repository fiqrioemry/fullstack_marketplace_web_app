import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, StoreIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StoreProduct from "../components/store/StoreProduct";
import { ModalContainer } from "../components/modal/ModalContainer";
import StoreInfo from "../components/modal/StoreInfo";

const Store = () => {
  return (
    <section className="container mx-auto">
      <div className="space-y-6 py-6 md:px-6 px-2">
        <Card className="grid grid-cols-1 md:grid-cols-2 py-8 space-y-8 ">
          <div className="flex">
            <div className="w-60 flex justify-center">
              <div className="w-32 h-32 bg-primary rounded-full"></div>
            </div>
            <div className="space-y-4">
              <h4>Toko Serba Murah</h4>
              <span>Terakhir online : 1 jam lalu</span>
              <div className="flex items-center gap-x-4">
                <Button>Chat Penjual</Button>

                <ModalContainer
                  title={
                    <Button variant="outline">
                      <StoreIcon />
                    </Button>
                  }
                >
                  <StoreInfo />
                </ModalContainer>

                <Button variant="outline">
                  <Share2 />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-x-2 px-4 md:px-8">
            <div className="text-center text-background bg-primary p-3">
              <h4>4.8</h4>
              <div>Rating & Ulasan</div>
            </div>
            <div className="text-center text-background bg-primary p-3">
              <h4>Max 2 Jam</h4>
              <div>Pesanan diproses</div>
            </div>
            <div className="text-center text-background bg-primary p-3">
              <h4>Buka 24 Jam</h4>
              <div>Jam Operasional</div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="about" className="">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About store</TabsTrigger>
            <TabsTrigger value="product">Product Store</TabsTrigger>
          </TabsList>
          <TabsContent value="about"></TabsContent>
          <TabsContent value="product">
            <StoreProduct />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Store;
