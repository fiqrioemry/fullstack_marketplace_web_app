import { SellerNavLinks } from "../../config";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShopNavTabs = () => {
  const location = useLocation();

  const currentTab =
    SellerNavLinks.find((link) => link.href === location.pathname)?.title ||
    "settings";

  return (
    <Tabs value={currentTab} className="flex justify-center">
      <TabsList className="w-full grid grid-cols-3">
        {SellerNavLinks.map((link) => {
          return (
            <Link to={link.href} key={link.href}>
              <TabsTrigger value={link.title} className="w-full">
                {link.title}
              </TabsTrigger>
            </Link>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default ShopNavTabs;
