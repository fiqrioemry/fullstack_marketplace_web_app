import { Fragment } from "react";
import { ShopAuthPath } from "../../config";
import AuthNav from "../navigation/AuthNav";
import ShopNav from "../navigation/ShopNav";
import { useLocation } from "react-router-dom";
import NonAuthNav from "../navigation/NonAuthNav";

const NavMenu = () => {
  const isUserAuth = true;
  const location = useLocation();

  return (
    <Fragment>
      {!isUserAuth && <NonAuthNav />}
      {isUserAuth && !ShopAuthPath.includes(location.pathname) && <AuthNav />}
      {isUserAuth && ShopAuthPath.includes(location.pathname) && <ShopNav />}
    </Fragment>
  );
};

export default NavMenu;
