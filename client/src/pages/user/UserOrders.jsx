import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import OrdersList from "@/components/user/OrdersList";
import TransactionsLoading from "@/components/loading/TransactionsLoading";

const UserOrders = () => {
  const { getAllUserOrders, orders } = useUserStore();

  useEffect(() => {
    getAllUserOrders();
  }, [getAllUserOrders]);

  if (!orders) return <TransactionsLoading />;

  return <OrdersList />;
};

export default UserOrders;
