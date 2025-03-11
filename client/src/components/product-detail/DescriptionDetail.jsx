/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import { formatToRupiah } from "@/lib/utils";
import useHandleCart from "@/hooks/useHandleCart";
import ProcessButton from "@/components/form/processButton";

const DescriptionDetail = ({ product }) => {
  const {
    loading,
    quantity,
    handleIncrease,
    handleDecrease,
    handleAddToCart,
    handleCheckout,
  } = useHandleCart(product);

  const { name, price, stock, store, description, category } = product;

  return (
    <div className="col-start-1 col-end-13 md:col-start-8 md:col-end-13">
      <div>
        <div className="border-b border-muted pb-4">
          <Link
            to={`/category/${category.name}`}
            className="text-muted-foreground"
          >
            {category.name}
          </Link>
          <h4 className="mb-2">{name}</h4>
          <span>Rp.{price}</span>
        </div>
        <div className="border-b border-muted py-4">
          <span className="text-md font-medium">Description :</span>
          <p>{description}</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ratione
            obcaecati rerum ab inventore velit assumenda, quos numquam
            necessitatibus corrupti.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ratione
            obcaecati rerum ab inventore velit assumenda, quos numquam
            necessitatibus corrupti.
          </p>
        </div>

        <div className="flex justify-between gap-4 items-center border-b border-muted pt-4 pb-4">
          <div className="flex items-center gap-4">
            <img
              src={store.avatar}
              className="w-14 object-cover rounded-full flex-shrink-0"
            />
            <div className="flex-1 flex flex-col">
              <Link
                to={`/${store.slug}`}
                className="font-medium text-xs md:text-sm"
              >
                {store.name}
              </Link>
              <span className="text-xs md:text-sm">{store.city}</span>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center border rounded-lg overflow-hidden w-32">
              <button
                className="btn-nav p-3"
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <div className="w-12 text-center font-medium">{quantity}</div>
              <button
                className="btn-nav p-3"
                onClick={handleIncrease}
                disabled={quantity >= stock}
              >
                <Plus size={16} />
              </button>
            </div>
            <h4>Subtotal : {formatToRupiah(quantity * price)}</h4>
          </div>
          <span className="text-xs md:text-sm">Remaining stock : {stock}</span>
        </div>
        <div className="flex gap-4">
          <ProcessButton
            loading={loading}
            title={"Add to Cart"}
            variant={"secondary"}
            onClick={handleAddToCart}
          />
          <ProcessButton
            loading={loading}
            title={"Checkout"}
            onClick={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionDetail;
