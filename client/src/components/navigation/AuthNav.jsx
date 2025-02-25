/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import UserAvatar from "@/components/ui/Avatar";
import UserMenu from "@/components/dropdown/UserMenu";
import ShoppingCart from "@/components/cart/ShoppingCart";
import NotificationMenu from "@/components/dropdown/NotificationMenu";
import DropDownOpenStore from "@/components/dropdown/DropDownOpenStore";

const AuthNav = ({ user }) => {
  return (
    <nav className="flex items-center gap-x-6">
      <NotificationMenu />
      <ShoppingCart />
      {user.role === "customer" ? (
        <DropDownOpenStore />
      ) : (
        <Link to="/store">
          <UserAvatar avatar={user.storeAvatar} />
        </Link>
      )}
      <UserMenu user={user} />
    </nav>
  );
};

export default AuthNav;
