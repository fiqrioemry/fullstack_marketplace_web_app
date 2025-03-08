import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShoppingBag } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const ShoppingCart = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <ShoppingBag />
      </PopoverTrigger>
      <PopoverContent>
        <h5>Shopping Cart</h5>
        <DropdownMenuSeparator />
        <div className="h-[200px] flex items-center justify-center">
          Your Cart is Empty
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShoppingCart;
