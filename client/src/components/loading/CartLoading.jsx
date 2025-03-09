import { Skeleton } from "@/components/ui/skeleton";

const CartLoading = () => {
  return (
    <div className="h-screen container mx-auto px-2 py-3 md:py-6 ">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5 md:col-span-3">
          <Skeleton className="h-28 rounded-md mb-4" />
          <Skeleton className="h-40 rounded-md mb-4" />
          <Skeleton className="h-40 rounded-md mb-4" />
        </div>
        <div className="col-span-5 md:col-span-2">
          <Skeleton className="h-72 rounded-md mb-4" />
        </div>
      </div>
    </div>
  );
};

export default CartLoading;
