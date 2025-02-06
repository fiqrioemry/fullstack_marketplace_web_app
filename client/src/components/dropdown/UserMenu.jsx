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
import { LogOut } from "lucide-react";
import UserAvatar from "../ui/Avatar";
import { Link } from "react-router-dom";
import { CustomerNavLinks } from "../../config";
import { useAuthStore } from "../../store/useAuthStore";

const UserMenu = ({ user }) => {
  const { userSignOut } = useAuthStore();

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
                className="w-full cursor-pointer  capitalize"
              >
                {link.title}
              </DropdownMenuItem>
            </Link>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={userSignOut}
          className="w-full cursor-pointer"
        >
          Log out
          <DropdownMenuShortcut>
            <LogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
