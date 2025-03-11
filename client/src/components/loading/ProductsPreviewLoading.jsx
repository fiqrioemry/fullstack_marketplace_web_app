import { Skeleton } from "@/components/ui/Skeleton";
import useResponsiveCount from "@/hooks/useResponsiveCount";

// eslint-disable-next-line react/prop-types
const ProductsLoading = ({ style = "grid-display-5" }) => {
  const count = useResponsiveCount(5);

  return (
    <div className={style}>
      {Array.from({ length: count }).map((_, index) => (
        <div className="space-y-4" key={index}>
          <Skeleton className="h-52 w-full rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default ProductsLoading;
