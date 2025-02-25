import { Skeleton } from "@/components/ui/Skeleton";
import useResponsiveCount from "@/hooks/useResponsiveCount";

const CategoryLoading = () => {
  const count = useResponsiveCount(5);
  const LoadingElement = Array.from({ length: count }, (_, index) => (
    <div className="space-y-4" key={index}>
      <Skeleton className="h-[12rem] w-full rounded-md" />
      <Skeleton className="h-5 w-full rounded-md" />
    </div>
  ));

  return (
    <section className="min-h-svh">
      <div className="section-margin">
        <div className="grid-display-5">{LoadingElement}</div>
      </div>
    </section>
  );
};

export default CategoryLoading;
