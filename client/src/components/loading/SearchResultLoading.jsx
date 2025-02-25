import ProductsLoading from "./ProductsLoading";
import { Skeleton } from "@/components/ui/Skeleton";

const SearchResultLoading = () => {
  return (
    <section className="section-margin">
      <Skeleton className="h-8 w-72 rounded-md" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="flex justify-end">
            <Skeleton className=" h-8 w-72 rounded-md mb-4" />
          </div>
          <ProductsLoading />
        </div>
      </div>
    </section>
  );
};

export default SearchResultLoading;
