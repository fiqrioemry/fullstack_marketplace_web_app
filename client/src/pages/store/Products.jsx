import { cn } from "@/lib/utils";
import { PackagePlus, PackageSearch } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const Products = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <main className="py-3 md:py-6">
      <Tabs defaultValue={currentPath} className="container mx-auto mb-3 px-2">
        <TabsList className="justify-between md:justify-start">
          {productsMenu.map((menu) => {
            const activePath = currentPath === menu.path;
            return (
              <TabsTrigger value={menu.path} key={menu.title}>
                <Link
                  to={menu.path}
                  className={cn(
                    activePath ? "text-blue-700" : "text-foreground",
                    "hover:text-blue-700"
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

export default Products;
