/* eslint-disable react/prop-types */
import { formatToRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

const CheckoutTotalPrice = ({ transactionForm }) => {
  const { checkoutItem, cart } = useCartStore();

  const totalShipmentCost = transactionForm.values.orders.reduce(
    (sum, order) =>
      sum + (order.shipmentCost ? parseFloat(order.shipmentCost) : 0),
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

  const isShipmentIncomplete = transactionForm.values.orders.some(
    (order) => order.shipmentCost === ""
  );

  return (
    <div className="bg-background rounded-lg border">
      <h4 className="p-2 border-b">Order Summary</h4>
      <div className="space-y-2 p-2 border-b">
        <div className="flex items-center justify-between">
          Total Shipment Cost :
          <span className="font-medium text-sm">
            {formatToRupiah(totalShipmentCost)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          Total Items Price :
          <span className="font-medium text-sm">
            {formatToRupiah(totalItemPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          Billing to Pay :
          <span className="font-medium text-sm">
            {formatToRupiah(totalBilling)}
          </span>
        </div>
      </div>
      <div className="p-2">
        <button
          disabled={isShipmentIncomplete}
          onClick={transactionForm.handleSubmit}
          className="btn btn-primary w-full rounded-md"
        >
          Proceed To Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutTotalPrice;
