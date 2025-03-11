import { Skeleton } from "@/components/ui/skeleton";

const SearchLoading = () => {
  return (
    <div className="flex flex-col">
      {[...Array(4)].map((_, index) => (
        <Skeleton className="h-5 w-full mt-2 mb-2 rounded-md" key={index} />
      ))}
    </div>
  );
};

export default SearchLoading;
