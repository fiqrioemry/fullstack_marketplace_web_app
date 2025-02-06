/* eslint-disable react/prop-types */
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useProvider } from "@/context/GlobalProvider";
import ProcessButton from "@/components/form/processButton";

const ProductDisplay = ({ product }) => {
  const navigate = useNavigate();
  const { isAuthenticate } = useProvider();
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addCartItem, isCartLoading } = useCartStore();

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      return Math.min(newQuantity, product.stock);
    });
  };

  const handleDecrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev - 1;
      return Math.max(newQuantity, 1);
    });
  };

  const handleCheckout = () => {
    if (isAuthenticate) {
      navigate("/cart/checkout", {
        state: {
          product: {
            slug: product.slug,
            quantity,
          },
        },
      });
    } else {
      navigate("/signin");
    }
  };

  const handleAddToCart = (productId) => {
    if (isAuthenticate) {
      addCartItem(productId, quantity);
    } else {
      navigate("/signin");
    }
  };

  const handleSetThumbnail = (index) => {
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
                  onClick={() => handleSetThumbnail(index)}
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
              disabled={isCartLoading || quantity === 1}
              onClick={handleDecrease}
              className=" p-4 border-r rounded-l-md"
            >
              <Minus />
            </button>
            <div className="text-center w-[100px]">{quantity}</div>
            <button
              disabled={isCartLoading || quantity === product.stock}
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
            loading={isCartLoading}
            onClick={() => handleAddToCart(product.id)}
          />
          <ProcessButton
            title={"Checkout"}
            loading={isCartLoading}
            onClick={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
