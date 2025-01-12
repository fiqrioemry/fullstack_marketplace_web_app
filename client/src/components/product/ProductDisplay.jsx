/* eslint-disable react/prop-types */
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProvider } from "../../context/GlobalProvider";

const ProductDisplay = ({ product }) => {
  const navigate = useNavigate();
  const { userData } = useProvider();
  const [total, setTotal] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIncrease = () => {
    setTotal((prev) => {
      const newTotal = prev + 1;
      return Math.min(newTotal, product.stock);
    });
  };

  const handleDecrease = () => {
    setTotal((prev) => {
      const newTotal = prev - 1;
      return Math.max(newTotal, 1);
    });
  };

  const handleCheckout = () => {
    if (userData.length !== 0) {
      navigate("/cart/checkout", {
        state: {
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: total,
          },
        },
      });
    } else {
      navigate("/signin");
    }
  };
  const handleAddToCart = () => {
    console.log("add to cart");
  };

  const handleSetThumbnail = (index) => {
    setActiveIndex(index);
  };

  const images = product?.images || [];
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className=" col-start-1 col-end-13 md:col-start-1 md:col-end-7">
        <div className="grid grid-cols-10 gap-2 ">
          <div className="col-span-10 md:col-span-2 flex md:grid grid-rows-4 gap-2">
            {images.map((image, index) => (
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
                src={images[activeIndex]}
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
        <div className="py-4 mb-4 border-b-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
          veritatis sed, eos provident quidem dicta dolore sequi dolorum magni
          qui neque quos quia quae eveniet.
        </div>

        {/* product quantity and add box */}
        <div className="flex gap-5 items-center mb-4">
          <div className="flex items-center border rounded-md">
            <button
              onClick={handleDecrease}
              className=" p-4 border-r rounded-l-md"
            >
              <Minus />
            </button>
            <div className="text-center w-[100px]">{total}</div>
            <button
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
          Subtotal : {total * product.price}
        </div>

        {/* button */}
        <div className="space-y-4">
          <Button
            onClick={handleAddToCart}
            variant="secondary"
            className="w-full py-6"
          >
            Add to Card
          </Button>
          <Button onClick={handleCheckout} className="w-full py-6">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
