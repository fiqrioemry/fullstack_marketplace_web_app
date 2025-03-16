import { useEffect, useState } from "react";
import { useShopStore } from "@/store/useShopStore";
import OrdersPreview from "@/components/seller/orders/OrdersPreview";
import TransactionsLoading from "@/components/loading/TransactionsLoading";
import SellerOrdersFilter from "@/components/seller/orders/SellerOrdersFilter";

const SellerOrders = () => {
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
    <>
      <SellerOrdersFilter handleFilter={handleFilter} filter={filter} />
      <OrdersPreview orders={orders} />
    </>
  );
};

export default SellerOrders;
