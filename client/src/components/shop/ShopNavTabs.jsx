/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShopNavTabs = ({ shopname }) => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  return (
    <Tabs className="mb-6" defaultValue={currentPath}>
      <TabsList className="justify-between md:justify-start">
        <TabsTrigger className="w-full" value={shopname} asChild>
          <Link className="btn-accent" to=".">
            Beranda
          </Link>
        </TabsTrigger>

        <TabsTrigger className="w-full" value={`${shopname}/products`} asChild>
          <Link className="btn-accent" to="products">
            Products
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ShopNavTabs;
