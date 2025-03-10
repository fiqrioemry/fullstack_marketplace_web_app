import { formatToRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

const TotalCheckoutPrice = () => {
  const { checkoutItem, cart } = useCartStore();

  const totalShipmentCost = cart.reduce(
    (sum, store) =>
      sum +
      store.items
        .filter((item) => checkoutItem.includes(item.cartId))
        .reduce((acc, item) => acc + item.price * item.quantity, 0),
    0
  );

  const totalItemPrice = cart.reduce(
    (sum, store) =>
      sum +
      store.items
        .filter((item) => checkoutItem.includes(item.cartId))
        .reduce((acc, item) => acc + item.price * item.quantity, 0),
    0
  );

  const totalBilling = totalItemPrice + totalShipmentCost;

  return (
    <div className="bg-background rounded-lg p-4 border">
      <h4 className="mb-4">Order Summary</h4>
      <div className="flex flex-col space-y-2 mb-4">
        <span>Total Shipment Cost :{formatToRupiah(totalShipmentCost)} </span>
        <span>Total Items Price :{formatToRupiah(totalItemPrice)}</span>
        <span>Total Billing :{formatToRupiah(totalBilling)}</span>
      </div>
      <button className="btn btn-primary w-full rounded-md font-medium">
        Proceed To Payment
      </button>
    </div>
  );
};

export default TotalCheckoutPrice;
