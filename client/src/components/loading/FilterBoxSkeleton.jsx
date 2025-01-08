import { Skeleton } from "@/components/ui/skeleton";

const FilterBoxSkeleton = () => {
  return (
    <div className="py-4 px-2 space-y-4 h-full">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-full" />
    </div>
  );
};

export default FilterBoxSkeleton;
