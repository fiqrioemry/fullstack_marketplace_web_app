import OrdersDisplay from "@/components/dashboard/OrdersDisplay";
import { useShopStore } from "../../store/useShopStore";
import { useEffect } from "react";
import PageLoading from "../../components/loading/PageLoading";

const Orders = () => {
  const { getAllStoreOrders, orders } = useShopStore();

  useEffect(() => {
    getAllStoreOrders();
  }, [getAllStoreOrders]);

  if (!orders) return <PageLoading />;
  return <OrdersDisplay />;
};

export default Orders;
