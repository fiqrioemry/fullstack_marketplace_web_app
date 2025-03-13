import {
  Sidebar,
  SidebarMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import { Link, useLocation } from "react-router-dom";
import { Bell, BoxIcon, ChartLine, Settings, Truck } from "lucide-react";
import Avatar from "../ui/Avatar";
import { useAuthStore } from "../../store/useAuthStore";

const dashboardMenu = [
  {
    title: "dashboard",
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
    path: "/store/orders",
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
  const { user } = useAuthStore();
  const currentPath = location.pathname;

  return (
    <Sidebar>
      <SidebarContent className="p-2">
        <SidebarHeader>
          <div className="px-1.5">
            <Logo />
          </div>
        </SidebarHeader>

        <SidebarMenu>
          {dashboardMenu.map((menu) => {
            const activePath = currentPath === menu.path;
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
      <SidebarFooter>
        <div className="justify-start btn-nav">
          <Avatar user={user} />
          <div>
            <h5>{user.fullname}</h5>
            <span className="text-xs md:text-sm">{user.email}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
export default DashboardSidebar;
