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
import UserAvatar from "../UserAvatar";
import { Link } from "react-router-dom";
import { SellerNavLinks } from "../../config";

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShopMenu;
