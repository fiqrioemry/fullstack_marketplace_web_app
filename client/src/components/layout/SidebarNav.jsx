import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import WebLogo from "@/components/ui/WebLogo";
import { useLocation } from "react-router-dom";
import { Calendar, Inbox, Settings } from "lucide-react";

const customerNav = [
  {
    title: "Profile",
    url: "/user/profile",
    icon: Settings,
  },
  {
    title: "Address",
    url: "/user/address",
    icon: Inbox,
  },
  {
    title: "transactions",
    url: "/user/transaction",
    icon: Calendar,
  },
  {
    title: "notifications",
    url: "/user/Notification",
    icon: Calendar,
  },
];

const sellerNav = [
  {
    title: "dashboard",
    url: "/store",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/store/profile",
    icon: Settings,
  },
  {
    title: "Products",
    url: "/store/products",
    icon: Inbox,
  },
  {
    title: "Orders",
    url: "/store/order",
    icon: Calendar,
  },
  {
    title: "Notifications",
    url: "/store/Notification",
    icon: Calendar,
  },
];

export function SidebarNav() {
  const location = useLocation().pathname;

  const navigationMenu = location.includes("store") ? sellerNav : customerNav;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="p-4">
          <WebLogo />
        </SidebarHeader>

        <SidebarGroup>
          <SidebarMenu>
            {navigationMenu.map((item) => {
              const active = location.includes(item.url);
              return (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(active ? "bg-gray-100" : "", "rounded-md")}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
