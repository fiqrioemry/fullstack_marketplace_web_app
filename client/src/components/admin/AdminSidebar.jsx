import {
  Sidebar,
  SidebarMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import Avatar from "@/components/ui/Avatar";
import { BoxIcon, ChartLine } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useLocation } from "react-router-dom";

const dashboardMenu = [
  {
    title: "dashboard",
    path: "/admin",
    icon: ChartLine,
  },
  {
    title: "users",
    path: "/admin/users",
    icon: BoxIcon,
  },
  {
    title: "categories",
    path: "/admin/categories",
    icon: BoxIcon,
  },
  {
    title: "shipments",
    path: "/admin/shipments",
    icon: BoxIcon,
  },
];

const AdminSidebar = () => {
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
export default AdminSidebar;
