/* eslint-disable react/prop-types */
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import ProcessButton from "@/components/form/processButton";
import useHandleCart from "@/components/product/hooks/useHandleCart";

const Product = ({ product }) => {
  const {
    loading,
    quantity,
    handleIncrease,
    handleDecrease,
    handleAddToCart,
    handleCheckout,
  } = useHandleCart(product);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnail = (index) => {
    setActiveIndex(index);
  };

  const { id, name, price, description, stock, images } = product;

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-start-1 col-end-13 md:col-start-1 md:col-end-7">
        <div className="grid grid-cols-10 gap-2 ">
          <div className="col-span-10 md:col-span-2 flex md:grid grid-rows-4 gap-2">
            {images.map((image, index) => (
              <div className="border rounded-md overflow-hidden" key={index}>
                <img
                  className="object-cover w-full h-full"
                  src={image}
                  onClick={() => handleThumbnail(index)}
                  alt="product"
                />
              </div>
            ))}
          </div>

          <div className="col-span-10 md:col-span-8">
            <div className="border rounded-md overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={images[activeIndex]}
                alt="product"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-13 md:col-start-8 md:col-end-13">
        <div className="space-y-4">
          <h2>{name}</h2>
          <h3>Rp.{price}</h3>
          <p>{description}</p>
          <div className="flex items-center gap-5">
            <div className="flex items-center border rounded-lg overflow-hidden w-32">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="bnt-nav p-3"
              >
                <Minus size={16} />
              </button>
              <div className="w-12 text-center font-medium">{quantity}</div>
              <button
                onClick={handleIncrease}
                disabled={quantity >= stock}
                className="btn-nav p-3"
              >
                <Plus size={16} />
              </button>
            </div>

            <h4>Stock : {stock}</h4>
          </div>
          <h2>Subtotal : Rp. {quantity * price}</h2>
          <div className="space-y-4">
            <ProcessButton
              loading={loading}
              title={"Add to Cart"}
              variant={"secondary"}
              onClick={() => handleAddToCart(id)}
            />
            <ProcessButton
              loading={loading}
              title={"Checkout"}
              onClick={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
