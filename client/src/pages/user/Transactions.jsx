import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import TransactionsList from "@/components/user/TransactionsList";
import TransactionsLoading from "@/components/loading/TransactionsLoading";

const Transactions = () => {
  const { getAllTransactions, transactions } = useUserStore();

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  if (!transactions) return <TransactionsLoading />;

  return <TransactionsList />;
};

export default Transactions;
