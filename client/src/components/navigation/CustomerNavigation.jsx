import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CustomerNavLinks = [
  {
    title: "Settings",
    href: "/user/settings",
  },
  {
    title: "Address",
    href: "/user/address",
  },
  {
    title: "Transaction",
    href: "/user/transaction",
  },
];

const CustomerNavigation = () => {
  const location = useLocation();

  const currentTab =
    CustomerNavLinks.find((link) => link.href === location.pathname)?.title ||
    "Settings";

  return (
    <Tabs defaultValue={currentTab} className="flex justify-center">
      <TabsList className="w-full grid grid-cols-3">
        {CustomerNavLinks.map((link) => {
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

export default CustomerNavigation;
