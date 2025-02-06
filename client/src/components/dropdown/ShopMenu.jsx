/* eslint-disable react/prop-types */
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { SellerNavLinks } from "@/config";
import UserAvatar from "@/components/ui/Avatar";

const ShopMenu = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserAvatar avatar={user.storeAvatar} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 capitalize">
        <DropdownMenuLabel>{user.storeName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SellerNavLinks.map((link) => {
          return (
            <Link to={link.href} key={link.href}>
              <DropdownMenuItem
                value={link.title}
                className="w-full cursor-pointer"
              >
                {link.title}
              </DropdownMenuItem>
            </Link>
          );
        })}
        <Link to="/user/profile">
          <DropdownMenuItem className="w-full cursor-pointer">
            Customer Dashboard
            <DropdownMenuShortcut>
              <Home />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShopMenu;
