import { Skeleton } from "@/components/ui/Skeleton";
import useResponsiveCount from "@/hooks/useResponsiveCount";

const ProductsSkeleton = () => {
  const count = useResponsiveCount();

  return (
    <div className="grid_display_5">
      {[...Array(count)].map((_, index) => (
        <div className="space-y-4" key={index}>
          <Skeleton className="h-52  w-full rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
