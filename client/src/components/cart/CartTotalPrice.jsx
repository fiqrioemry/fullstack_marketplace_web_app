/* eslint-disable react/prop-types */
import { formatToRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";

const CartTotalPrice = ({ cart }) => {
  const navigate = useNavigate();
  const { checkoutItem } = useCartStore();

  const handleCheckout = () => {
    navigate("/cart/checkout");
  };

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
      <h4>Shopping Summary</h4>
      <div className="flex justify-between py-3 text-lg font-medium">
        <span>Total</span>

        <span>{formatToRupiah(totalPrice)}</span>
      </div>
      <button
        onClick={handleCheckout}
        disabled={checkoutItem.length === 0}
        className="btn btn-primary w-full disabled:bg-gray-200 rounded-md font-medium"
      >
        Checkout ({checkoutItem.length})
      </button>
    </div>
  );
};

export default CartTotalPrice;
