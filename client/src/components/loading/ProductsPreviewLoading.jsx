import { Skeleton } from "@/components/ui/Skeleton";

const ProductsPreviewLoading = () => {
  return (
    <div className="container mx-auto">
      <div className="px-2 py-3 md:py-6">
        <Skeleton className="h-9 w-60 rounded-md mb-2" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          <div className="col-span-1">
            <Skeleton className="h-12 md:h-full w-full rounded-md" />
          </div>

          <div className="col-span-4">
            <div className="grid-display-5">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <div className="space-y-4" key={index}>
                    <Skeleton className="h-52 w-full rounded-md" />
                    <Skeleton className="h-5 w-full rounded-md" />
                    <Skeleton className="h-5 w-full rounded-md" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPreviewLoading;
