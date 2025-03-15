import { useEffect, useState } from "react";
import { useShopStore } from "@/store/useShopStore";
import StoreOrderCard from "@/components/dashboard/orders/StoreOrderCard";
import TransactionsLoading from "@/components/loading/TransactionsLoading";
import StoreOrdersFilter from "@/components/dashboard/orders/StoreOrdersFilter";
import NoStoreOrderHistory from "@/components/dashboard/orders/NoStoreOrderHistory";

const Orders = () => {
  const [filter, setFilter] = useState("");
  const { getAllStoreOrders, orders } = useShopStore();

  const handleFilter = (params) => {
    setFilter(params);
  };

  useEffect(() => {
    getAllStoreOrders(filter);
  }, [getAllStoreOrders, filter]);

  if (!orders) return <TransactionsLoading />;

  return (
    <div className="container mx-auto py-3 md:py-6 px-2">
      <StoreOrdersFilter handleFilter={handleFilter} filter={filter} />
      {orders.length === 0 ? (
        <NoStoreOrderHistory />
      ) : (
        <>
          {orders.map((order) => (
            <StoreOrderCard order={order} key={order.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Orders;
