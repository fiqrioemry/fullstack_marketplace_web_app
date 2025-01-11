/* eslint-disable react/prop-types */
import CartItem from "../CartItem";
import UserAvatar from "../UserAvatar";
import { Link } from "react-router-dom";
import UserNavMenu from "../dropdown/UserNavMenu";
import ShopNavMenu from "../dropdown/ShopNavMenu";
import { Heart, ShoppingBag, Store } from "lucide-react";
import DropDownContainer from "../dropdown/DropDownContainer";

const AuthNav = ({ user }) => {
  console.log(user);
  return (
    <nav className="flex items-center gap-x-6">
      <Heart />
      <CartItem>
        <ShoppingBag />
      </CartItem>

      {user.role === "customer" ? (
        <DropDownContainer trigger={<Store />}>
          <ShopNavMenu />
        </DropDownContainer>
      ) : (
        <Link to="/shop">
          <UserAvatar avatar={user.store?.storeAvatar} />
        </Link>
      )}

      <DropDownContainer trigger={<UserAvatar avatar={user.avatar} />}>
        <UserNavMenu />
      </DropDownContainer>
    </nav>
  );
};

export default AuthNav;
