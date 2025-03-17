import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
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
    href: "/user/transactions",
  },
];

const UserMenu = () => {
  const { logout, user } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Avatar user={user} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NavMenu.map((menu) => (
          <Link to={menu.href} key={menu.href} className="btn-nav ">
            {menu.title}
          </Link>
        ))}
        <DropdownMenuSeparator />
        <button onClick={logout} className="btn-nav w-full rounded-md">
          signout <LogOut size={18} />
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
