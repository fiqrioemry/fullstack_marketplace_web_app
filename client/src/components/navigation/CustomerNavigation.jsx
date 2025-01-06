import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CustomerNavigation = () => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger>
          <Link to="/user/settings">Settings</Link>
        </TabsTrigger>
        <TabsTrigger>
          <Link to="/user/address">Address</Link>
        </TabsTrigger>
        <TabsTrigger>
          <Link to="/user/transaction">Transaction</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CustomerNavigation;
