/* eslint-disable react/prop-types */
import { formatToRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

const TotalCartPrice = ({ cart }) => {
  const { checkoutItem } = useCartStore();

  const totalPrice = cart.reduce(
    (sum, store) =>
      sum +
      store.items
        .filter((item) => checkoutItem.includes(item.cartId))
        .reduce((acc, item) => acc + item.price * item.quantity, 0),
    0
  );

  return (
    <div className="h-40 bg-background rounded-lg p-4 border">
      <h4>Ringkasan Belanja</h4>
      <div className="flex justify-between py-3 text-lg font-medium">
        <span>Total</span>

        <span>{formatToRupiah(totalPrice)}</span>
      </div>
      <button className="btn btn-primary w-full rounded-md font-medium">
        Beli ({checkoutItem.length})
      </button>
    </div>
  );
};

export default TotalCartPrice;
