import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StoreAbout from "@/components/store/StoreAbout";
import StoreProduct from "@/components/store/StoreProduct";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Store = () => {
  return (
    <section className="container mx-auto">
      <div className="space-y-6 py-6 md:px-6 px-2">
        <Card className="grid grid-cols-1 md:grid-cols-2 py-8 space-y-8 ">
          <div className="flex px-4">
            <div className="w-60 flex justify-center">
              <div className="w-32 h-32 border border-foreground rounded-full">
                <img />
              </div>
            </div>
            <div className="space-y-4">
              <h4>Toko Serba Murah</h4>
              <span>Terakhir online : 1 jam lalu</span>
              <div className="flex items-center space-x-2  ">
                <Button>Chat Penjual</Button>

                {/* <ModalContainer
                  title={
                    <Button variant="outline">
                      <StoreIcon />
                    </Button>
                  }
                >
                  <StoreInfo />
                </ModalContainer>

                <ModalContainer
                  title={
                    <Button variant="outline">
                      <Share2 />
                    </Button>
                  }
                >
                  <StoreInfo />
                </ModalContainer> */}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-x-2 px-4 md:px-8 md:text-md text-sm">
            <div className="text-center p-3">
              <h4>4.8</h4>
              <div>Rating & Ulasan</div>
            </div>
            <div className="border border-foreground h-full"></div>
            <div className="text-center  p-3">
              <h4>Max 2 Jam</h4>
              <div>Pesanan diproses</div>
            </div>
            <div className="border border-foreground h-full"></div>
            <div className="text-center p-3">
              <h4>Buka 24 Jam</h4>
              <div>Jam Operasional</div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="about">
          <TabsList className="grid w-full grid-cols-2 mb-6">
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
