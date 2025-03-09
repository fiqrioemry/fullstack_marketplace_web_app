import { Skeleton } from "@/components/ui/skeleton";

const AddressLoading = () => {
  return (
    <div className="h-40">
      <div className="flex justify-end">
        <Skeleton className=" w-40 h-10 rounded-md mb-4" />
      </div>
      <Skeleton className="w-full h-40 rounded-md mb-4" />
      <Skeleton className="w-full h-40 rounded-md mb-4" />
      <Skeleton className="w-full h-40 rounded-md mb-4" />
    </div>
  );
};

export default AddressLoading;
