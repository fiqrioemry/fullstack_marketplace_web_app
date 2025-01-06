/* eslint-disable react/style-prop-object */

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDescription = () => {
  return (
    <div>
      {/* product title */}
      <div className="mb-2">
        <h1 className="text-2xl font-semibold">Samsung galaxy X-4</h1>
      </div>

      {/* product price */}
      <div className="text-xl font-medium">Rp. 10.000.000</div>

      {/* product description */}
      <div className="py-4 mb-4 border-b-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt veritatis
        sed, eos provident quidem dicta dolore sequi dolorum magni qui neque
        quos quia quae eveniet.
      </div>

      {/* product quantity and add box */}
      <div className="flex gap-5 items-center mb-4">
        <div className="flex items-center border rounded-md">
          <button className=" p-4 border-r rounded-l-md">
            <Minus />
          </button>
          <div className="text-center w-[100px]">1</div>
          <button className=" p-4 border-r rounded-l-md">
            <Plus />
          </button>
        </div>
        <div className="text-xl">Stock : 5</div>
      </div>

      {/* product price in total */}
      <div className="font-medium h text-xl mb-6">
        Subtotal : Rp. 50.000.0000
      </div>

      {/* button */}
      <div className="space-y-4">
        <Button variant="secondary" className="w-full py-6">
          Add to Card
        </Button>
        <Button className="w-full py-6">Checkout</Button>
      </div>
    </div>
  );
};

export default ProductDescription;
