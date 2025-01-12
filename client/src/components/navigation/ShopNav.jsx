/* eslint-disable react/prop-types */
import ShopMenu from "../dropdown/ShopMenu";
import NotificationMenu from "../dropdown/NotificationMenu";

const ShopNav = ({ user }) => {
  return (
    <nav className="flex items-center gap-x-6">
      <NotificationMenu />
      <ShopMenu user={user} />
    </nav>
  );
};

export default ShopNav;
