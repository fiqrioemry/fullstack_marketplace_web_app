/* eslint-disable react/prop-types */
import { formatToRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Minus, Plus, Square, Trash2, CheckSquare } from "lucide-react";

const CartItemDisplay = ({ cart }) => {
  const {
    removeCart,
    checkoutItem,
    selectAllCheckout,
    handleCartDecrease,
    handleCartIncrease,
    toggleCheckoutItem,
  } = useCartStore();

  return (
    <div className="md:col-span-2 bg-background border rounded-lg p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <button onClick={selectAllCheckout} className="flex gap-4 btn-accent">
          {checkoutItem.length ===
          cart.flatMap((store) => store.items).length ? (
            <CheckSquare />
          ) : (
            <Square />
          )}
          <span>
            Pilih Semua ({cart.flatMap((store) => store.items).length})
          </span>
        </button>
      </div>

      {cart.map((store) => (
        <div key={store.storeId} className="border-b py-4">
          <h5>{store.storeName}</h5>
          {store.items.map((item) => (
            <div
              key={item.cartId}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-3">
                {/* Checkbox untuk memilih satu item */}
                <button
                  className="btn-accent"
                  onClick={() => toggleCheckoutItem(item.cartId)}
                >
                  {checkoutItem.includes(item.cartId) ? (
                    <CheckSquare />
                  ) : (
                    <Square />
                  )}
                </button>
                <img
                  src={item.images}
                  alt={item.name}
                  className="h-16 w-16 border object-cover rounded-md"
                />
                <div>
                  <h5>{item.name}</h5>
                  <span className="text-sm md:text-md font-semibold">
                    {formatToRupiah(item.price)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm border p-1 rounded-md gap-2">
                  <button
                    className="btn-nav"
                    disabled={item.quantity <= 1}
                    onClick={() => handleCartDecrease(item)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm md:text-md w-10 text-center">
                    {item.quantity}
                  </span>
                  <button
                    className="btn-nav"
                    disabled={item.quantity >= item.stock}
                    onClick={() => handleCartIncrease(item)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeCart(item.cartId)}
                  className="btn-delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CartItemDisplay;
