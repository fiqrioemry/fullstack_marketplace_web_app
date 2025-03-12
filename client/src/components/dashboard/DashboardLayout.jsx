import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarTrigger />
      <div className="flex-1 container mx-auto px-2 py-3 md:py-6">
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
