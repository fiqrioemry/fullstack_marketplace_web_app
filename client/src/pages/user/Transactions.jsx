import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import TransactionsDisplay from "@/components/user/TransactionsDisplay";
import TransactionsLoading from "@/components/loading/TransactionsLoading";

const Transactions = () => {
  const { getTransactions, transactions } = useShopStore();

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  if (!transactions) return <TransactionsLoading />;

  

  return <TransactionsDisplay />;
};

export default Transactions;
