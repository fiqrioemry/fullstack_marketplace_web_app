import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const ShoppingCart = () => {
  const { cart, getCarts } = useCartStore();

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  return (
    <Popover>
      <PopoverTrigger>
        <ShoppingBag className="md:h-7 md:w-7 w-5 h-5" />
      </PopoverTrigger>
      <PopoverContent className="h-72 flex flex-col">
        <div className="flex items-center justify-between">
          <h5>Shopping Cart</h5>
          <Link className="btn-accent text-sm">See all</Link>
        </div>
        <DropdownMenuSeparator />
        <div className="flex-1 ">
          {cart && cart.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <h4>Your cart is empty</h4>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <h4>Here is your cart</h4>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShoppingCart;
