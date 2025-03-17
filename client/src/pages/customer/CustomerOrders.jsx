import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import OrdersFilter from "@/components/customer/orders/OrdersFilter";
import OrdersPreview from "@/components/customer/orders/OrdersPreview";
import TransactionsLoading from "@/components/loading/TransactionsLoading";

const CustomerOrders = () => {
  const [filter, setFilter] = useState("");
  const { getAllUserOrders, orders } = useUserStore();

  const handleFilter = (params) => {
    setFilter(params);
  };

  useEffect(() => {
    getAllUserOrders(filter);
  }, [getAllUserOrders, filter]);

  if (!orders) return <TransactionsLoading />;

  return (
    <div className="container mx-auto py-3 md:py-6 px-2">
      <OrdersFilter handleFilter={handleFilter} filter={filter} />
      <OrdersPreview orders={orders} />
    </div>
  );
};

export default CustomerOrders;
