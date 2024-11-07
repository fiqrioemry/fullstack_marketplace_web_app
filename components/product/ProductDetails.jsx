"use client";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 space-y-4 md:space-y-0">
      {/* product images */}
      <div className="w-full flex flex-wrap space-y-2 md:space-y-0">
        <div className="w-full flex mt-4 md:mt-0 order-2 md:order-none md:flex-col md:w-[20%] justify-between">
          {[...Array(4)].map((_, index) => {
            return (
              <div className="w-[80px] h-[80px] borders" key={index}></div>
            );
          })}
        </div>
        <div className="w-full md:h-auto h-[350px] md:w-[80%] borders"></div>
      </div>

      {/* product description */}
      <div>
        <h2>PRODUCT NAME</h2>
        <h3>RP. 1.750.000</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          in eos corrupti dolore sit nulla aliquid quibusdam magnam quas totam
          mollitia architecto minima quidem eaque modi consequatur unde
          aspernatur saepe?
        </p>
        <div className="py-2">
          <div className="flex">
            <Button variant="primary">
              <FaMinus />
            </Button>
            <div className="w-[75px] flex-center borders-tb">1</div>
            <Button variant="primary">
              <FaPlus />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Button className="w-full">ADD TO CART</Button>
          <Button className="w-full">CHECKOUT</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
