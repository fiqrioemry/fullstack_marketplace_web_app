import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";

import { SellerNavLinks } from "../../config";

const ShopNav = () => {
  return (
    <nav className="flex items-center gap-x-6">
      <DropDown>
        {SellerNavLinks.map((link) => {
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
        <Link to="/user/settings">
          <DropdownMenuItem className="w-full cursor-pointer">
            My-Dashboard
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropDown>
    </nav>
  );
};

export default ShopNav;
