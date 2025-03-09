import {
  Sidebar,
  SidebarMenu,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import { Link, useLocation } from "react-router-dom";
import { Bell, BoxIcon, ChartLine, Settings, Truck } from "lucide-react";

const dashboardMenu = [
  {
    title: "sales",
    path: "/store",
    icon: ChartLine,
  },
  {
    title: "Profile",
    path: "/store/profile",
    icon: Settings,
  },
  {
    title: "Products",
    path: "/store/products",
    icon: BoxIcon,
  },
  {
    title: "Orders",
    path: "/store/order",
    icon: Truck,
  },
  {
    title: "Notifications",
    path: "/store/Notification",
    icon: Bell,
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  return (
    <Sidebar>
      <SidebarContent className="p-2">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>

        <SidebarMenu>
          {dashboardMenu.map((menu) => {
            const activePath = currentPath === menu.title;
            return (
              <Link
                to={menu.path}
                className={cn(
                  activePath ? "bg-gray-200" : "bg-transparent",
                  "btn-nav w-full rounded-md"
                )}
                key={menu.title}
              >
                {menu.title}
                <menu.icon className="ml-2 w-5 h-5 inline" />
              </Link>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
export default DashboardSidebar;
