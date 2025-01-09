import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCartItem from "../components/cart/ProductCartItem";

const Cart = () => {
  const handleRemoveCart = () => {
    console.log("remove all item");
  };
  return (
    <section>
      <div className="container mx-auto">
        <div className="space-y-6 py-6 md:px-6 px-2">
          <h4>Shopping Cart</h4>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-9 space-y-2 md:space-y-4 ">
              <Card>
                <CardContent className="p-4 flex items-center justify-between h-20">
                  <div className="flex gap-4">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Select All Item</span>
                  </div>

                  <div className="cursor-pointer">
                    <Trash2 onCLick={handleRemoveCart} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex space-x-4">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Storename</span>
                  </div>

                  <div className="space-y-6">
                    <ProductCartItem />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-12 md:col-span-3  ">
              <Card>
                <CardContent className="p-4 space-y-4 ">
                  <h4>Shopping Summary</h4>
                  <div className="flex items-center justify-between">
                    <h5>Total</h5>
                    <span>Rp. 500.0000</span>
                  </div>
                  <div>
                    <Button className="w-full">Checkout</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
