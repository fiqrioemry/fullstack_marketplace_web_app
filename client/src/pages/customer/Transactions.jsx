import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import TransactionsLoading from "@/components/loading/TransactionsLoading";
import TransactionsFilter from "@/components/customer/transactions/TransactionsFilter";
import TransactionsPreview from "@/components/customer/transactions/TransactionsPreview";

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
      <TransactionsPreview transactions={transactions} />
    </div>
  );
};

export default Transactions;
