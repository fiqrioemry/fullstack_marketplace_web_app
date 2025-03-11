import ProductsLoading from "./ProductsLoading";
import { Skeleton } from "@/components/ui/Skeleton";

const SearchResultLoading = () => {
  return (
    <div className="container mx-auto">
      <div className="px-2 py-3 md:py-6 space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          <div className="col-span-1">
            <Skeleton className="rounded-lg w-full h-full" />
          </div>
          <div className="col-span-4 space-y-4">
            <div>
              <ProductsLoading />
            </div>
            <div>
              <ProductsLoading />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultLoading;
