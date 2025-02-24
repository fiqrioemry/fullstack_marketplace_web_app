/* eslint-disable react/prop-types */
import UserAvatar from "../ui/Avatar";
import { Link } from "react-router-dom";
import UserMenu from "../dropdown/UserMenu";
import OpenShop from "../dropdown/OpenShop";
import ShoppingCart from "@/components/cart/ShoppingCart";
import NotificationMenu from "../dropdown/NotificationMenu";

const AuthNav = ({ user }) => {
  return (
    <nav className="flex items-center gap-x-6">
      <NotificationMenu />
      <ShoppingCart />
      {user.role === "customer" ? (
        <OpenShop />
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
