import { Fragment } from "react";
import { ShopAuthPath } from "../../config";
import AuthNav from "../navigation/AuthNav";
import ShopNav from "../navigation/ShopNav";
import NonAuthNav from "../navigation/NonAuthNav";
import { useProvider } from "../../context/GlobalProvider";

const NavMenu = () => {
  const { userData, currentPath } = useProvider();

  return (
    <Fragment>
      {!userData && <NonAuthNav />}
      {userData && !ShopAuthPath.includes(currentPath) && (
        <AuthNav user={userData} />
      )}
      {userData && ShopAuthPath.includes(currentPath) && (
        <ShopNav user={userData} />
      )}
    </Fragment>
  );
};

export default NavMenu;
