import {
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import { Separator } from "@/components/ui/separator";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";

const SellerLayout = () => {
  return (
    <SidebarProvider>
      <SellerSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-50">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <PageBreadCrumb />
        </header>
        <div className="flex flex-1 flex-col bg-muted">
          <div className="container mx-auto py-3 md:py-6 px-2">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SellerLayout;
