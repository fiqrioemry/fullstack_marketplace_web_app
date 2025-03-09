/* eslint-disable react/prop-types */
import { formatToRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

const TotalCheckoutPrice = ({ cart }) => {
  const { checkoutItem } = useCartStore();

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
    <div className="h-40 bg-background rounded-lg p-4 border">
      <h4>Order Summary</h4>
      <div className="flex justify-between py-3 text-lg font-medium">
        <span>Total Shipment Cost :{formatToRupiah(totalShipmentCost)} </span>
        <span>Total Items Price :{formatToRupiah(totalItemPrice)}</span>
        <span>Total Billing :{formatToRupiah(totalBilling)}</span>
      </div>
      <button className="btn btn-primary w-full rounded-md font-medium">
        Create a payment ({checkoutItem.length})
      </button>
    </div>
  );
};

export default TotalCheckoutPrice;
