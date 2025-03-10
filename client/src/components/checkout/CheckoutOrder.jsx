import { useCartStore } from "@/store/useCartStore";
import { formatToRupiah } from "../../lib/utils";

const CheckoutOrder = () => {
  const { cart, checkoutItem } = useCartStore();
  const orders = cart
    .map((store) => ({
      ...store,
      items: store.items.filter((item) => checkoutItem.includes(item.cartId)),
    }))
    .filter((store) => store.items.length > 0);

  return (
    <div>
      {orders.map((store, index) => (
        <div key={store.storeId} className=" bg-background mb-4 rounded-lg p-4">
          <h3 className="text-gray-500">order {index + 1}</h3>
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
          <h5 className="mb-1">select shipment method</h5>
          <select
            name="shipmentCost"
            type="select"
            className="px-2 py-2 w-full border border-muted-foreground/50 rounded-md"
          >
            <option value="" disabled>
              shipment method
            </option>
            <option value={32500}>
              <div>JNE - Rp. 32.500</div>
              <span> - Estimated 3-4 Days</span>
            </option>
            <option value={21500}>
              <div>Si Cepat - Rp. 21.500</div>
              <span> - Estimated 3-5 Days</span>
            </option>
            <option value={38000}>
              <div>ExpressNinja - Rp.38.000</div>
              <span> - Estimated 2-4 Days</span>
            </option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default CheckoutOrder;
