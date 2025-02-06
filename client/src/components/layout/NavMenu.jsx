import AuthNav from "../navigation/AuthNav";
import ShopNav from "../navigation/ShopNav";
import NonAuthNav from "../navigation/NonAuthNav";
import { useProvider } from "../../context/GlobalProvider";

const NavMenu = () => {
  const { user, isAuthenticate, location } = useProvider();

  return (
    <>
      {!isAuthenticate && <NonAuthNav />}
      {isAuthenticate && !location.includes("store") && <AuthNav user={user} />}
      {isAuthenticate && location.includes("store") && <ShopNav user={user} />}
    </>
  );
};

export default NavMenu;
