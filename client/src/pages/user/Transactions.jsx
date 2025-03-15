import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import TransactionsLoading from "@/components/loading/TransactionsLoading";
import TransactionCard from "@/components/user/transactions/TransactionCard";

const Transactions = () => {
  const { getAllTransactions, transactions } = useUserStore();
  console.log(transactions);
  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  if (!transactions) return <TransactionsLoading />;

  return (
    <div className="container mx-auto py-3 md:py-6 px-2">
      {transactions.map((transaction) => (
        <TransactionCard transaction={transaction} key={transaction.id} />
      ))}
    </div>
  );
};

export default Transactions;
