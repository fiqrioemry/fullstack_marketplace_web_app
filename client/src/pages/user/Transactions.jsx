import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import TransactionsLoading from "@/components/loading/TransactionsLoading";
import TransactionCard from "@/components/user/transactions/TransactionCard";

const Transactions = () => {
  const { getAllTransactions, transactions } = useUserStore();

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  if (!transactions) return <TransactionsLoading />;

  return (
    <div className="h-full container mx-auto py-3 md:py-6 px-2">
      <div className="h-full py-4 border-t border-b">
        {transactions.map((transaction) => {
          <TransactionCard transaction={transaction} key={transaction.id} />;
        })}
      </div>
    </div>
  );
};

export default Transactions;
