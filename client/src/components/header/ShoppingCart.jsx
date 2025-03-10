import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatToRupiah } from "@/lib/utils";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { ScrollArea } from "@/components/ui/scroll-area";

const ShoppingCart = () => {
  const { cart, getCarts, removeCart } = useCartStore();

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  if (!cart) return null;

  const totalItems = cart.reduce((sum, store) => sum + store.items.length, 0);
  const totalPrice = cart.reduce(
    (sum, store) =>
      sum +
      store.items.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0
      ),
    0
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative">
          <ShoppingBag className="w-5 h-5" />
          <div className="absolute top-0 -right-2 h-4 w-4 bg-red-500 flex items-center justify-center text-white rounded-full text-xs">
            {totalItems}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center justify-between border-b px-2 pb-2">
          <h4>Shopping Cart</h4>

          <Link to="/cart" className="text-xs btn-accent">
            See all
          </Link>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto max-h-72 px-2">
          {cart.length === 0 ? (
            <div className="h-40 flex items-center justify-center">
              <div className="text-center">
                {/* Teks */}
                <h2 className="text-lg font-semibold text-gray-800">
                  Wah, keranjang belanjamu kosong
                </h2>
                <p className="text-gray-500 text-sm">
                  Yuk, isi dengan barang-barang impianmu!
                </p>

                <Link to="/" className="btn btn-primary rounded-md mt-4">
                  Mulai Belanja
                </Link>
              </div>
            </div>
          ) : (
            cart.map((store) => (
              <div key={store.storeId} className="border-b py-2">
                <div className="flex items-center">
                  <h5>{store.storeName}</h5>
                </div>
                {store?.items.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                      <div>
                        <h5>{item.name}</h5>
                        <p className="text-xs text-gray-500">
                          Quantity : {item.quantity}
                        </p>
                        <p className="text-sm font-semibold">
                          {formatToRupiah(item.price)}
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn-accent px-2"
                      onClick={() => removeCart(item.cartId)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ))
          )}
        </ScrollArea>

        {/* Total Price Section */}
        {cart.length > 0 && (
          <div className="border-t pt-3 flex justify-between font-semibold text-md px-2">
            <span>Total ({totalItems} product):</span>
            <span>{formatToRupiah(totalPrice)}</span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ShoppingCart;
