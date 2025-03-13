import { Skeleton } from "@/components/ui/skeleton";

const ProductListLoading = () => {
  return (
    <div className="p-4">
      <Skeleton className="h-8 w-full rounded-md mb-6" />
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex items-center gap-4 mb-6">
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-20 md:w-40" />
            <Skeleton className="h-6 w-20 md:w-40" />
            <Skeleton className="h-6 w-20 md:w-40" />
          </div>
        ))}
    </div>
  );
};

export default ProductListLoading;
