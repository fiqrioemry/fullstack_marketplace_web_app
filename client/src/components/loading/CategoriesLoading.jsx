import { Skeleton } from "@/components/ui/Skeleton";
import useResponsiveCount from "@/hooks/useResponsiveCount";

const CategoriesLoading = () => {
  const count = useResponsiveCount(5);

  return (
    <div className="grid-display-5">
      {[...Array(count)].map((_, index) => (
        <div className="space-y-4" key={index}>
          <Skeleton className="h-[12rem] w-full rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default CategoriesLoading;
