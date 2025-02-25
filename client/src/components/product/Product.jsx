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

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className=" col-start-1 col-end-13 md:col-start-1 md:col-end-7">
        <div className="grid grid-cols-10 gap-2 ">
          <div className="col-span-10 md:col-span-2 flex md:grid grid-rows-4 gap-2">
            {product?.images.map((image, index) => (
              <div key={index}>
                <img
                  className="object-cover w-full h-full  "
                  src={image}
                  onClick={() => handleThumbnail(index)}
                  alt="product_image"
                />
              </div>
            ))}
          </div>

          <div className="col-span-10 md:col-span-8">
            <div className="flex justify-center items-center rounded-md ">
              <img
                className="object-cover w-full h-full"
                src={product.images[activeIndex]}
                alt="product_image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-13 md:col-start-8 md:col-end-13">
        <div className="mb-2">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
        </div>

        {/* product price */}
        <div className="text-xl font-medium">Rp. {product.price}</div>

        {/* product description */}
        <div className="py-4 mb-4 border-b-2">{product.description}</div>

        {/* product quantity and add box */}
        <div className="flex gap-5 items-center mb-4">
          <div className="flex items-center border rounded-md">
            <button
              disabled={loading || quantity === 1}
              onClick={handleDecrease}
              className=" p-4 border-r rounded-l-md"
            >
              <Minus />
            </button>
            <div className="text-center w-[100px]">{quantity}</div>
            <button
              disabled={loading || quantity === product.stock}
              onClick={handleIncrease}
              className=" p-4 border-r rounded-l-md"
            >
              <Plus />
            </button>
          </div>
          <div className="text-xl">Stock : {product.stock}</div>
        </div>

        {/* product price in total */}
        <div className="font-medium h text-xl mb-6">
          Subtotal : {quantity * product.price}
        </div>

        {/* button */}
        <div className="space-y-4">
          <ProcessButton
            title={"Add to Cart"}
            variant={"secondary"}
            loading={loading}
            onClick={() => handleAddToCart(product.id)}
          />
          <ProcessButton
            title={"Checkout"}
            loading={loading}
            onClick={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
