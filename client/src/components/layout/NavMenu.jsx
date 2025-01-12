import { ShopAuthPath } from "../../config";
import AuthNav from "../navigation/AuthNav";
import ShopNav from "../navigation/ShopNav";
import NonAuthNav from "../navigation/NonAuthNav";
import { useProvider } from "../../context/GlobalProvider";

const NavMenu = () => {
  const { userData, currentPath } = useProvider();
  const isShopAuthPath = userData && ShopAuthPath.includes(currentPath);

  return (
    <>
      {!userData && <NonAuthNav />}
      {userData &&
        (isShopAuthPath ? (
          <ShopNav user={userData} />
        ) : (
          <AuthNav user={userData} />
        ))}
    </>
  );
};

export default NavMenu;
