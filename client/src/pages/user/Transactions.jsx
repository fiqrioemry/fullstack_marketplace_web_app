import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import TransactionsDisplay from "@/components/user/TransactionsDisplay";
import TransactionsLoading from "@/components/loading/TransactionsLoading";

const Transactions = () => {
  const { getTransactions, transactions } = useUserStore();

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  if (!transactions) return <TransactionsLoading />;

  return <TransactionsDisplay />;
};

export default Transactions;
