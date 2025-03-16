import { cn } from "@/lib/utils";
import { PackagePlus, PackageSearch } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProduct from "@/components/seller/products/AddProduct";

const productsMenu = [
  {
    title: "products",
    path: "/store/products",
    icon: PackageSearch,
  },
  {
    title: "Add products",
    path: "/store/products/add",
    icon: PackagePlus,
  },
];

const SellerProducts = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-background py-2 rounded-lg">
      <AddProduct />
      <Tabs defaultValue={currentPath}>
        <TabsList className="justify-between md:justify-start">
          {productsMenu.map((menu) => {
            const activePath = currentPath === menu.path;
            return (
              <TabsTrigger value={menu.path} key={menu.title} asChild>
                <Link
                  to={menu.path}
                  className={cn(activePath ? "btn-accent" : "text-foreground")}
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
      <div className="pt-4 pb-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerProducts;
