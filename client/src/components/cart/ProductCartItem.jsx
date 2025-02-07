/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

const ProductCartItem = ({ product }) => {
  const [count, setCount] = useState(1);
  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div className="flex space-x-4">
      <input type="checkbox" className="w-5 h-5" />
      <div className="h-20 w-20 ">
        <img className={product.images[0]} alt="product" />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <h4>{product.name}</h4>
        <div className="flex gap-x-4 items-center justify-between">
          <div>
            <h5>{product.price}</h5>
          </div>
          <div className="flex items-center gap-x-4 scale-90">
            <Trash2 />
            <div className="flex items-center space-x-2 ">
              <Button
                onClick={handleDecrease}
                className={`${count === 1 ? "cursor-not-allowed" : ""} p-2`}
                disabled={count === 1}
              >
                <Minus />
              </Button>
              <span className="justify-center rounded-md h-10 items-center flex border w-[10ch]">
                {count}
              </span>
              <Button
                onClick={handleIncrease}
                className={`${count === 5 ? "cursor-not-allowed" : ""} p-2`}
                disabled={count === 5}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCartItem;
