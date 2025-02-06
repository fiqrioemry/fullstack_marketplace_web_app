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

const items = [
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

export function SidebarNav() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="p-4">
          <WebLogo />
        </SidebarHeader>

        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => {
              const active = location.pathname.includes(item.url);
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
