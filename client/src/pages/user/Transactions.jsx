import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import TransactionsLoading from "@/components/loading/TransactionsLoading";

const Transactions = () => {
  const { getTransactions, transactions } = useShopStore();

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  if (!transactions) return <TransactionsLoading />;

  return null;
};

export default Transactions;
