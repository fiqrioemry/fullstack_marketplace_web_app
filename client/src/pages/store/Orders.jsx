import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import PageLoading from "@/components/loading/PageLoading";
import OrdersDisplay from "@/components/dashboard/OrdersDisplay";

const Orders = () => {
  const { getAllStoreOrders, orders } = useShopStore();

  useEffect(() => {
    getAllStoreOrders();
  }, [getAllStoreOrders]);

  if (!orders) return <PageLoading />;

  return <OrdersDisplay />;
};

export default Orders;
