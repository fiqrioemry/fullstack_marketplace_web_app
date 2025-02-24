import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import AuthNav from "@/components/navigation/AuthNav";
import ShopNav from "@/components/navigation/ShopNav";
import NonAuthNav from "@/components/navigation/NonAuthNav";

const NavMenu = () => {
  const location = useLocation().pathname;
  const { user, isAuthenticate } = useAuthStore();

  return (
    <>
      {!isAuthenticate && <NonAuthNav />}
      {isAuthenticate && !location.includes("store") && <AuthNav user={user} />}
      {isAuthenticate && location.includes("store") && <ShopNav user={user} />}
    </>
  );
};

export default NavMenu;
