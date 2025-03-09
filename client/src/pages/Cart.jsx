import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import CartDisplay from "@/components/cart/CartDisplay";
import CartLoading from "@/components/loading/CartLoading";

const Cart = () => {
  const { cart, getCarts } = useCartStore();

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  if (!cart) return <CartLoading />;

  return <CartDisplay cart={cart} />;
};

export default Cart;
