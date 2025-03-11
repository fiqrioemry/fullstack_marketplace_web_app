import { Skeleton } from "@/components/ui/Skeleton";

const CategoriesLoading = () => {
  return (
    <div className="grid-display-5">
      {[...Array(5)].map((_, index) => (
        <div className="space-y-4" key={index}>
          <Skeleton className="h-[12rem] w-full rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default CategoriesLoading;
