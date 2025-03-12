import { Skeleton } from "@/components/ui/skeleton";

const TransactionsLoading = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="w-full h-7 rounded-md" />
      <Skeleton className="w-full h-7 rounded-md" />
      <Skeleton className="w-full h-7 rounded-md" />
      <Skeleton className="w-full h-7 rounded-md" />
      <Skeleton className="w-full h-7 rounded-md" />
      <Skeleton className="w-full h-7 rounded-md" />
      <Skeleton className="w-full h-7 rounded-md" />
    </div>
  );
};

export default TransactionsLoading;
