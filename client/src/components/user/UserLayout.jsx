import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CreditCard, MapPin, UserRoundPen } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const userMenu = [
  {
    name: "settings",
    path: "/user/settings",
    icon: UserRoundPen,
  },
  {
    name: "address",
    path: "/user/address",
    icon: MapPin,
  },
  {
    name: "transactions",
    path: "/user/transactions",
    icon: CreditCard,
  },
];

const UserLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  return (
    <main className="py-3 md:py-6">
      <Tabs defaultValue={currentPath} className="container mx-auto px-2 mb-3">
        <TabsList className="flex justify-between md:justify-start">
          {userMenu.map((menu) => {
            const activePath = currentPath === menu.name;
            return (
              <TabsTrigger value={menu.name} key={menu.name}>
                <Link
                  to={menu.path}
                  className={cn(
                    activePath ? "text-blue-700" : "text-foreground",
                    "flex items-center "
                  )}
                  key={menu.name}
                >
                  {menu.name}
                  <menu.icon className="ml-2 w-5 h-5 inline" />
                </Link>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
      <section className="container mx-auto mb-3">
        <Outlet />
      </section>
    </main>
  );
};

export default UserLayout;
