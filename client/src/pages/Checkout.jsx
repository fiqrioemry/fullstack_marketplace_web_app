import { checkoutState } from "@/config";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useCheckoutLoading } from "@/hooks/useCheckoutLoading";
import CheckoutOrder from "@/components/checkout/CheckoutOrder";
import CheckoutLoading from "@/components/loading/CheckoutLoading";
import CheckoutAddress from "@/components/checkout/CheckoutAddress";

const Checkout = () => {
  const { cart, address, checkoutItem } = useCheckoutLoading();
  const checkoutForm = useFormSchema(null, checkoutState);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <CheckoutAddress checkoutForm={checkoutForm} />
            <CheckoutOrder checkoutForm={checkoutForm} />
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
