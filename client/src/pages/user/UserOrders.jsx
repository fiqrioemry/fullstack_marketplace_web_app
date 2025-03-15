import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import OrderCard from "@/components/user/orders/OrderCard";
import OrdersFilter from "@/components/user/orders/OrdersFilter";
import NoOrderHistory from "@/components/user/orders/NoOrderHistory";
import TransactionsLoading from "@/components/loading/TransactionsLoading";

const UserOrders = () => {
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
      {orders.length === 0 ? (
        <NoOrderHistory />
      ) : (
        <>
          {orders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default UserOrders;
