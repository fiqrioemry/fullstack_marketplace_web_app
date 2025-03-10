import { useCheckoutLoading } from "@/hooks/useCheckoutLoading";
import CheckoutLoading from "@/components/loading/CheckoutLoading";
import CheckoutDetail from "../components/checkout/CheckoutDetail";

const Checkout = () => {
  const { cart, address, checkoutItem } = useCheckoutLoading();

  if (
    !cart ||
    !address ||
    cart.length === 0 ||
    address.length === 0 ||
    checkoutItem.length === 0
  )
    return <CheckoutLoading />;

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-3 md:py-6 px-2">
        <h3 className="mb-4">Checkout</h3>
        <CheckoutDetail />
      </div>
    </section>
  );
};

export default Checkout;
