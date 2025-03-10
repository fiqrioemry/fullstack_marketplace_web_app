import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import CartLayout from "@/components/cart/CartLayout";
import CartLoading from "@/components/loading/CartLoading";
import CartTotalPrice from "@/components/cart/CartTotalPrice";
import CartItemDisplay from "@/components/cart/CartItemDisplay";
import CartEmpty from "../components/cart/CartEmpty";

const Cart = () => {
  const { cart, getCarts } = useCartStore();

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  if (!cart) return <CartLoading />;

  if (cart && cart.length === 0) return <CartEmpty />;

  return (
    <CartLayout>
      <CartItemDisplay cart={cart} />
      <CartTotalPrice cart={cart} />
    </CartLayout>
  );
};

export default Cart;
