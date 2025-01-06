import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const SellerNavigation = () => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger>
          <Link to="/shop/settings">Settings</Link>
        </TabsTrigger>
        <TabsTrigger>
          <Link to="/shop/notification">Notification</Link>
        </TabsTrigger>
        <TabsTrigger>
          <Link to="/shop/order">order</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SellerNavigation;
