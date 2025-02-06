import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../store/useUserStore";
import { useProductStore } from "../store/useProductStore";
import ProductCartItem from "../components/cart/ProductCartItem";

const Checkout = () => {
  const [checkout, setCheckout] = useState({});
  const { slug, quantity } = useLocation().state.product;
  const { getProduct, product } = useProductStore();
  const { address, getUserAddress } = useUserStore();

  useEffect(() => {
    getUserAddress();
  }, [getUserAddress]);

  useEffect(() => {
    if (slug) {
      getProduct(slug);
    }
  }, [slug, getProduct]);

  useEffect(() => {
    if (product && product.length !== 0) {
      setCheckout({
        ...product,
        quantity,
      });
    }
  }, [product, quantity]);

  // cartItem (productId & quantity)

  return (
    <section className="bg-muted ">
      <div className="container mx-auto">
        <div className="px-2 md:px-6 space-y-6 py-6">
          <h4 className="text-2xl">Checkout</h4>
          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-12 md:col-span-9 space-y-4">
              <div>
                <div className="bg-background rounded-md shadow-md space-y-2 p-4">
                  <ProductCartItem product={checkout} />
                  <div className="pl-32 space-y-2">
                    <h5>Select Shipment method</h5>
                    <div className="col-start-3 col-end-13">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-3 space-y-4">
              <div className="bg-background rounded-md shadow-md">
                <div className="p-4 space-y-4">
                  <h4>Checkout Summary</h4>
                  <div className="flex items-center justify-between">
                    <h5>Total</h5>
                    <span>Rp. 500.0000</span>
                  </div>
                  <div>
                    <Button className="w-full">Checkout</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
