import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { CustomerNavLinks } from "../../config";

const UserNavMenu = () => {
  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Shop</DropdownMenuLabel>
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
  );
};

export default UserNavMenu;
