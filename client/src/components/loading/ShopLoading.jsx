import { Skeleton } from "@/components/ui/skeleton";

const ShopLoading = () => {
  return (
    <div className="h-screen container mx-auto px-2 py-3 md:py-6 mb-12">
      <div className="flex justify-center gap-4 mb-6">
        <div className="flex gap-4">
          <Skeleton className="h-40 w-40 rounded-full" />
          <div className="w-48 space-y-4">
            <Skeleton className="h-7 w-20 rounded-md" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-20 rounded-md" />
              <Skeleton className="h-10 w-20 rounded-md" />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-7 w-ful rounded-md" />
          <Skeleton className="h-7 w-ful rounded-md" />
        </div>
      </div>

      <div className="space-y-6">
        <Skeleton className="w-full h-60 rounded-md" />
        <div className="space-y-4">
          <Skeleton className="w-full h-7 rounded-md" />
          <Skeleton className="w-full h-7 rounded-md" />
          <Skeleton className="w-full h-7 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ShopLoading;
