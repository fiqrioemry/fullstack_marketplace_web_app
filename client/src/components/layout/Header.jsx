import { Menu } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import UserMenu from "@/components/header/UserMenu";
import SearchBar from "@/components/header/SearchBar";
import ShoppingCart from "@/components/header/ShoppingCart";
import StoreOptions from "@/components/header/StoreOptions";
import Notifications from "@/components/header/Notifications";

const Header = () => {
  const { accessToken, user } = useAuthStore();
  console.log(user);
  console.log(accessToken);

  return (
    <header className="border-b py-2 px-2">
      <div className="flex items-center justify-between mx-auto container">
        <Logo />
        <SearchBar />

        {!accessToken ? (
          <nav>
            <div className="hidden md:flex items-center gap-4">
              <Link to="signin" className="btn btn-primary">
                Signin
              </Link>
              <Link to="signup" className="btn btn-secondary">
                Signup
              </Link>
            </div>
            <div className="block md:hidden cursor-pointer">
              <Menu />
            </div>
          </nav>
        ) : (
          <nav className="flex items-center gap-4">
            <Notifications />
            <StoreOptions />
            <ShoppingCart />
            <UserMenu />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
