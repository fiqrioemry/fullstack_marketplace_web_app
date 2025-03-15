/* eslint-disable react/prop-types */
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import UserMenu from "@/components/header/UserMenu";
import ShoppingCart from "@/components/header/ShoppingCart";
import StoreOptions from "@/components/header/StoreOptions";
import Notifications from "@/components/header/Notifications";

const NavigationMenu = ({ user }) => {
  return (
    <nav className="flex items-center gap-4">
      {!user ? (
        <>
          <div className="hidden md:flex items-center gap-2">
            <Link to="signin" className="btn btn-primary w-32 rounded-md">
              Signin
            </Link>
            <Link to="signup" className="btn btn-secondary w-32 rounded-md">
              Signup
            </Link>
          </div>
          <div className="block md:hidden cursor-pointer">
            <Menu />
          </div>
        </>
      ) : (
        <>
          <Notifications />
          <StoreOptions />
          <ShoppingCart />
          <UserMenu />
        </>
      )}
    </nav>
  );
};

export default NavigationMenu;
