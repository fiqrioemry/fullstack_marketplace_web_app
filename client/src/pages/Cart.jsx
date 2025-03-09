import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import CartLoading from "@/components/loading/CartLoading";
import TotalCartPrice from "@/components/cart/TotalCartPrice";
import CartItemDisplay from "@/components/cart/CartItemDisplay";

const Cart = () => {
  const { cart, getCarts } = useCartStore();

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  if (!cart) return <CartLoading />;

  return (
    <section className="bg-gray-100 px-2">
      <div className="container mx-auto py-3 md:py-6">
        <h2 className="mb-4">Keranjang</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CartItemDisplay cart={cart} />
          <TotalCartPrice cart={cart} />
        </div>
      </div>
    </section>
  );
};

export default Cart;
