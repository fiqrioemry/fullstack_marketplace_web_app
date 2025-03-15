import { useEffect, useState } from "react";

import { useUserStore } from "@/store/useUserStore";
import TransactionsLoading from "@/components/loading/TransactionsLoading";
import TransactionCard from "@/components/user/transactions/TransactionCard";
import TransactionsFilter from "@/components/user/transactions/TransactionsFilter";
import NoTransactionHistory from "@/components/user/transactions/NoTransactionHistory";

const Transactions = () => {
  const [filter, setFilter] = useState("");
  const { getAllTransactions, transactions } = useUserStore();

  const handleFilter = (param) => {
    setFilter(param);
  };

  useEffect(() => {
    getAllTransactions(filter);
  }, [getAllTransactions, filter]);

  if (!transactions) return <TransactionsLoading />;

  // TODO (Future enhancement): Tambahkan pagination, fitur pencarian dan fitur sort berdasarkan range hari
  return (
    <div className="container mx-auto py-3 md:py-6 px-2">
      <TransactionsFilter handleFilter={handleFilter} filter={filter} />
      {!transactions.length ? (
        <NoTransactionHistory />
      ) : (
        <>
          {transactions.map((transaction) => (
            <TransactionCard transaction={transaction} key={transaction.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Transactions;
