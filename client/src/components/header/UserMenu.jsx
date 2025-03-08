import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { LogOut, X } from "lucide-react";
import { Link } from "react-router-dom";
import UserAvatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";

const NavMenu = [
  {
    title: "profile",
    href: "/user/profile",
  },
  {
    title: "address",
    href: "/user/address",
  },
  {
    title: "transaction",
    href: "/user/transaction",
  },
];

const UserMenu = () => {
  const { logout, user } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="py-10 h-20" asChild>
        <UserAvatar avatar={user?.avatar} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NavMenu.map((menu) => (
          <Link to={menu.href} key={menu.href}>
            <DropdownMenuItem
              value={menu.title}
              className="w-full cursor-pointer capitalize"
            >
              {menu.title}
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
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
