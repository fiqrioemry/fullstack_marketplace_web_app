/* eslint-disable react/prop-types */
import UserAvatar from "../UserAvatar";
import { Link } from "react-router-dom";
import UserMenu from "../dropdown/UserMenu";
import OpenShop from "../dropdown/OpenShop";
import { Heart } from "lucide-react";
import ShoppingCart from "../ShoppingCart";
import NotificationMenu from "../dropdown/NotificationMenu";

const AuthNav = ({ user }) => {
  return (
    <nav className="flex items-center gap-x-6">
      <Heart />
      <NotificationMenu />
      <ShoppingCart />
      {user.role === "customer" ? (
        <OpenShop />
      ) : (
        <Link to="/shop">
          <UserAvatar avatar={user.storeAvatar} />
        </Link>
      )}
      <UserMenu user={user} />
    </nav>
  );
};

export default AuthNav;
