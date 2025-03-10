/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { formatToRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

const shipmentOptions = [
  {
    method: "Cargo",
    price: 20000,
    estimatedTime: "7 days",
  },
  {
    method: "Express",
    price: 50000,
    estimatedTime: "3 days",
  },
  {
    method: "Regular",
    price: 25000,
    estimatedTime: "5 days",
  },
];

const CheckoutOrder = ({ checkoutForm }) => {
  const { cart, checkoutItem } = useCartStore();

  const orders = cart
    .map((store) => ({
      ...store,
      items: store.items.filter((item) => checkoutItem.includes(item.cartId)),
    }))
    .filter((store) => store.items.length > 0);

  const transformData = (data) => {
    return data.map((store) => ({
      storeId: store.storeId,
      shipmentCost: "",
      cartItems: store.items.map((item) => item.cartId),
    }));
  };

  useEffect(() => {
    const transformedOrders = transformData(orders);
    checkoutForm.setFieldValue("orders", transformedOrders);
  }, []);

  const handleShipmentOptions = (event, storeId) => {
    const selectedPrice =
      event.target.value === "" ? "" : parseFloat(event.target.value);

    const updatedOrders = checkoutForm.values.orders.map((order) =>
      order.storeId === storeId
        ? { ...order, shipmentCost: selectedPrice }
        : order
    );

    checkoutForm.setFieldValue("orders", updatedOrders);
  };

  return (
    <div>
      {orders.map((store, index) => (
        <div key={store.storeId} className="bg-background mb-4 rounded-lg p-4">
          <h3 className="text-gray-500">Order {index + 1}</h3>
          <h5>{store.storeName}</h5>

          {store.items.map((item) => (
            <div
              key={item.cartId}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.images}
                  alt={item.name}
                  className="h-16 w-16 border object-cover rounded-md"
                />
                <div>
                  <h5>{item.name}</h5>
                  <span className="text-sm md:text-md font-semibold">
                    {formatToRupiah(item.price)} x {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <h5 className="mb-1">Select shipment method</h5>
          <select
            name="shipmentCost"
            value={
              checkoutForm.values.orders.find(
                (order) => order.storeId === store.storeId
              )?.shipmentCost || ""
            }
            onChange={(event) => handleShipmentOptions(event, store.storeId)}
            className="px-2 py-2 w-full border border-muted-foreground/50 rounded-md"
          >
            <option value="" disabled>
              Shipment Method
            </option>
            {shipmentOptions.map((opsi) => (
              <option value={opsi.price} key={opsi.method}>
                {opsi.method} - {opsi.estimatedTime} (
                {formatToRupiah(opsi.price)})
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default CheckoutOrder;
