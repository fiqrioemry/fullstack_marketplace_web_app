import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import TransactionsList from "@/components/user/transactions/TransactionsList";
import TransactionsLoading from "@/components/loading/TransactionsLoading";

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
          <TransactionsList transaction={transaction} key={transaction.id} />;
        })}
      </div>
    </div>
  );
};

export default Transactions;
