import { Skeleton } from "@/components/ui/skeleton";

const CartLoading = () => {
  return (
    <>
      <div className="col-span-2">
        <Skeleton className="h-28 rounded-md mb-4" />
        <Skeleton className="h-40 rounded-md mb-4" />
        <Skeleton className="h-40 rounded-md mb-4" />
      </div>
      <div className="col-span-1">
        <Skeleton className="h-60 rounded-md mb-4" />
      </div>
    </>
  );
};

export default CartLoading;
