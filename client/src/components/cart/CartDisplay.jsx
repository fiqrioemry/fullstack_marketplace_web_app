import { formatToRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { CheckSquare, Minus, Plus, Square, Trash2 } from "lucide-react";

const CartDisplay = () => {
  const { cart, setCheckoutItem, checkoutItem, removeCart, updateCart } =
    useCartStore();

  const handleSelectAll = () => {
    if (checkoutItem.length === cart.flatMap((store) => store.items).length) {
      setCheckoutItem([]);
    } else {
      setCheckoutItem(
        cart.flatMap((store) => store.items.map((item) => item.cartId))
      );
    }
  };

  const handleDecrease = (item) => {
    const newQuantity = item.quantity - 1;
    updateCart(item.cartId, newQuantity);
  };

  const handleIncrease = (item) => {
    const newQuantity = item.quantity + 1;
    updateCart(item.cartId, newQuantity);
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
    <section className="bg-gray-100">
      <div className="container mx-auto py-3 md:py-6">
        <h2 className="text-2xl font-bold mb-4">Keranjang</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2">
              <button
                onClick={handleSelectAll}
                className="flex items-center space-x-2"
              >
                {checkoutItem.length ===
                cart.flatMap((store) => store.items).length ? (
                  <CheckSquare className="text-green-500" />
                ) : (
                  <Square />
                )}
                <span>
                  Pilih Semua ({cart.flatMap((store) => store.items).length})
                </span>
              </button>
              <button className="text-red-500 hover:text-red-700">Hapus</button>
            </div>

            {cart.map((store) => (
              <div key={store.storeId} className="border-b py-4">
                <h3 className="text-lg font-semibold">{store.storeName}</h3>
                {store.items.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        className="text-accent"
                        onClick={() => setCheckoutItem(item.cartId)}
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
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <div className="text-lg font-semibold">
                          {formatToRupiah(item.price)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="btn-nav"
                        onClick={() => handleDecrease(item)}
                        disabled={Math.max(item.quantity <= 1, 0)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="btn-nav"
                        onClick={() => handleIncrease(item)}
                        disabled={Math.min(
                          item.quantity >= item.stock,
                          item.quantity
                        )}
                      >
                        <Plus size={16} />
                      </button>

                      <button
                        onClick={() => removeCart(item.cartId)}
                        className="btn-delete"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Ringkasan Belanja */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Ringkasan Belanja
            </h3>
            <div className="flex justify-between py-3 text-lg font-semibold">
              <span>Total</span>
              <span>{formatToRupiah(totalPrice)}</span>
            </div>
            <button className="w-full bg-green-500 text-white py-2 rounded-md font-semibold">
              Beli ({checkoutItem.length})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartDisplay;
