import { checkoutState } from "@/config";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useCheckoutLoading } from "@/hooks/useCheckoutLoading";
import CheckoutOrder from "@/components/checkout/CheckoutOrder";
import CheckoutLayout from "@/components/checkout/checkoutLayout";
import CheckoutLoading from "@/components/loading/CheckoutLoading";
import CheckoutAddress from "@/components/checkout/CheckoutAddress";
import CheckoutTotalPrice from "@/components/checkout/CheckoutTotalPrice";

const Checkout = () => {
  const { createNewTransaction } = useUserStore();
  const { cart, address, checkoutItem } = useCheckoutLoading();
  const transactionForm = useFormSchema(createNewTransaction, checkoutState);

  if (
    !cart ||
    !address ||
    cart.length === 0 ||
    address.length === 0 ||
    checkoutItem.length === 0
  )
    return <CheckoutLoading />;

  return (
    <CheckoutLayout>
      <div className="col-span-2">
        <CheckoutAddress transactionForm={transactionForm} />
        <CheckoutOrder transactionForm={transactionForm} />
      </div>
      <div className="col-span-1">
        <CheckoutTotalPrice transactionForm={transactionForm} />
      </div>
    </CheckoutLayout>
  );
};

export default Checkout;
