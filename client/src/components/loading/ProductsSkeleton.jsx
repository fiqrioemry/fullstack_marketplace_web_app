/* eslint-disable react-hooks/rules-of-hooks */
import { Skeleton } from "@/components/ui/Skeleton";
import useResponsiveCount from "@/hooks/useResponsiveCount";

// eslint-disable-next-line react/prop-types
const ProductsSkeleton = ({ value = 1 }) => {
  const count = useResponsiveCount() * value;

  return (
    <div className="grid_display_5">
      {Array.from({ length: count }).map((_, index) => (
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
