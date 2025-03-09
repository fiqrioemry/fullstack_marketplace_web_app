/* eslint-disable react/prop-types */
import { Card } from "@/components/ui/card";

const ShopHeader = ({ store }) => {
  return (
    <Card className="min-h-40 p-4 rounded-md mb-4">
      <div className="flex md:flex-row flex-col items-center justify-between gap-4">
        <div className="flex justify-start  items-center gap-4">
          <img
            alt={store.name}
            src={store.avatar}
            className="h-24 w-24 flex-shrink-0 rounded-full"
          />
          <div className="space-y-4">
            <h4>{store.name}</h4>
            <span>{store.city}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="border-r text-center px-4 w-40">
            <h4>4.6</h4>
            <span className="text-xs md:text-sm w-40">Rating & Reviews</span>
          </div>
          <div className="border-r text-center px-4 w-40">
            <h4>2 Hours</h4>
            <span className="text-xs md:text-sm ">Orders Process</span>
          </div>
          <div className="w-40 text-center">
            <h4>10.00 - 15.00</h4>
            <span className="text-xs md:text-sm">Working Hours</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ShopHeader;
