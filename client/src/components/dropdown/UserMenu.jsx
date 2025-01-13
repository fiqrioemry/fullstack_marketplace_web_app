/* eslint-disable react/prop-types */
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../UserAvatar";
import { Link } from "react-router-dom";
import { CustomerNavLinks } from "../../config";

const UserMenu = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserAvatar avatar={user.avatar} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
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
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
