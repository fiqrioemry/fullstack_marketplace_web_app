import { Skeleton } from "@/components/ui/skeleton";

const AddressCardLoading = () => {
  return (
    <div className="p-4 border rounded-lg bg-background mb-4">
      <Skeleton className="h-5 w-24 rounded-md mb-2" />
      <Skeleton className="h-5 w-24 rounded-md mb-2" />
      <Skeleton className="h-5 rounded-md mb-2" />
      <Skeleton className="h-10 w-32 rounded-md" />
    </div>
  );
};

export default AddressCardLoading;
