import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Fragment } from "react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

// eslint-disable-next-line react/prop-types
const CartItem = ({ children }) => {
  return (
    <Fragment>
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent>
          <h5>Shopping Cart</h5>
          <DropdownMenuSeparator />
          <div className="h-[200px] flex items-center justify-center">
            Your Cart is Empty
          </div>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
};

export default CartItem;
