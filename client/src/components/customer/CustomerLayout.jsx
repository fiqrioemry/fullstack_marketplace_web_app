import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, MapPin, Truck, UserRoundPen } from "lucide-react";

const customerMenu = [
  {
    title: "profile",
    path: "/user/profile",
    icon: UserRoundPen,
  },
  {
    title: "address",
    path: "/user/address",
    icon: MapPin,
  },
  {
    title: "transactions",
    path: "/user/transactions",
    icon: CreditCard,
  },
  {
    title: "orders",
    path: "/user/orders",
    icon: Truck,
  },
];

const CustomerLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <main className="py-3 md:py-6">
      <Tabs defaultValue={currentPath} className="container mx-auto mb-3 px-2">
        <TabsList className="justify-between md:justify-start">
          {customerMenu.map((menu) => {
            const activePath = currentPath === menu.path;
            return (
              <TabsTrigger value={menu.path} key={menu.title} asChild>
                <Link
                  to={menu.path}
                  className={cn(
                    activePath ? "text-blue-700" : "text-foreground"
                  )}
                  key={menu.title}
                >
                  {menu.title}
                  <menu.icon className="ml-2 w-5 h-5 inline" />
                </Link>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
      <section className="container mx-auto mb-3 px-2">
        <Outlet />
      </section>
    </main>
  );
};

export default CustomerLayout;
