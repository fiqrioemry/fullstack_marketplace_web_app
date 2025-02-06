import { Skeleton } from "@/components/ui/skeleton";

const AddressLoading = () => {
  return (
    <>
      <div>
        <Skeleton className="w-full h-24 rounded-md" />
      </div>
      <div className="space-y-4">
        <Skeleton className="w-full h-40 rounded-md" />
        <Skeleton className="w-full h-40 rounded-md" />
      </div>
    </>
  );
};

export default AddressLoading;
