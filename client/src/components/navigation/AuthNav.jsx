import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import DropDown from "./DropDown";
import CartItem from "../CartItem";
import { Link } from "react-router-dom";
import { CustomerNavLinks } from "../../config";
import { Heart, ShoppingBag, Store } from "lucide-react";

const AuthNav = () => {
  return (
    <nav className="flex items-center gap-x-6">
      <Heart />
      <CartItem>
        <ShoppingBag />
      </CartItem>

      <Link to={`/shop`}>
        <Store />
      </Link>

      <DropDown>
        {CustomerNavLinks.map((link) => {
          return (
            <Link to={link.href} key={link.href}>
              <DropdownMenuItem
                value={link.title}
                className="w-full cursor-pointer"
              >
                {link.title}
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropDown>
    </nav>
  );
};

export default AuthNav;
