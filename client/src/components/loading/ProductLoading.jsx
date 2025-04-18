import { Skeleton } from "@/components/ui/skeleton";

const ProductLoading = () => {
  return (
    <div className="container mx-auto px-2 py-3 md:py-6">
      <div className="grid grid-cols-12 gap-4 px-2">
        <div className="col-span-12 md:col-span-7 rounded-md grid grid-cols-4 gap-4">
          <Skeleton className="h-24 col-span-4 md:col-span-1 rounded-md" />

          <Skeleton className="h-96 col-span-4  md:col-span-3 rounded-md" />
        </div>
        <div className="col-span-12 md:col-span-5 space-y-4 rounded-md">
          <Skeleton className="h-7 w-1/2 rounded-md" />
          <Skeleton className="h-7 rounded-md" />
          <Skeleton className="h-7 rounded-md" />
          <Skeleton className="h-7 rounded-md" />
          <Skeleton className="h-7 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-1/2 rounded-md" />
            <Skeleton className="h-10 w-1/2 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoading;
