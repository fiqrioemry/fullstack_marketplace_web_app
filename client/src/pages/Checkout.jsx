import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import CartLoading from "@/components/loading/CartLoading";
import AddressSelection from "../components/checkout/AddressSelection";
import CheckoutOrder from "../components/checkout/CheckoutOrder";

const Cart = () => {
  const { cart, getCarts, checkoutItem } = useCartStore();

  console.log(checkoutItem);

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  if (!cart) return <CartLoading />;

  return (
    <section className="bg-gray-100 ">
      <div className="container mx-auto py-3 md:py-6 px-2">
        <h2 className="mb-4">Checkout</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AddressSelection />
          <CheckoutOrder />
        </div>
      </div>
    </section>
  );
};

export default Cart;
