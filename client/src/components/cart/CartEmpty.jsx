import CartLayout from "@/components/cart/CartLayout";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <CartLayout>
      <div className="col-span-2">
        <div className="h-40 p-4 bg-background flex items-center rounded-lg justify-center">
          <div className="text-center">
            {/* Teks */}
            <h2 className="text-lg font-semibold text-gray-800">
              Wah, keranjang belanjamu kosong
            </h2>
            <p className="text-gray-500 text-sm">
              Yuk, isi dengan barang-barang impianmu!
            </p>

            {/* Tombol Mulai Belanja */}
            <Link to="/" className="btn btn-primary rounded-md mt-4">
              Mulai Belanja
            </Link>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="h-40 bg-background rounded-lg p-4">
          <h4 className="text-gray-800 font-semibold">Ringkasan Belanja</h4>
          <div className="flex justify-between py-3 text-lg font-medium">
            <span>Total</span>
            <span>-----</span>
          </div>
          <button
            disabled={true}
            className="btn btn-primary w-full disabled:bg-gray-200 rounded-md font-medium"
          >
            Checkout
          </button>
        </div>
      </div>
    </CartLayout>
  );
};

export default CartEmpty;
