import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

const SellerNavLinks = [
  {
    title: "Settings",
    href: "/shop/settings",
  },
  {
    title: "Notification",
    href: "/shop/notification",
  },
  {
    title: "Order",
    href: "/shop/order",
  },
];

const SellerNavigation = () => {
  const location = useLocation();

  // Cari title berdasarkan path saat ini
  const currentTab =
    SellerNavLinks.find((link) => link.href === location.pathname)?.title ||
    "Settings";

  return (
    <Tabs defaultValue={currentTab} className="flex justify-center">
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

export default SellerNavigation;
