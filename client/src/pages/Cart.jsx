import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import CartLoading from "@/components/loading/CartLoading";
import TotalCartPrice from "@/components/cart/TotalCartPrice";
import CartItemDisplay from "@/components/cart/CartItemDisplay";
import CartLayout from "../components/cart/CartLayout";

const Cart = () => {
  const { cart, getCarts } = useCartStore();

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  if (!cart)
    return (
      <CartLayout>
        <CartLoading />
      </CartLayout>
    );

  return (
    <CartLayout>
      <CartItemDisplay cart={cart} />
      <TotalCartPrice cart={cart} />
    </CartLayout>
  );
};

export default Cart;
