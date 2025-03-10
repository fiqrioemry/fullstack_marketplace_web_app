import { Skeleton } from "@/components/ui/skeleton";

const SettingsLoading = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3">
      <div className=" col-span-1 flex justify-center ">
        <Skeleton className="flex-shrink-0 h-40 w-40 rounded-md" />
      </div>

      <div className="col-span-2 space-y-8">
        <Skeleton className="w-full h-8 rounded-md" />
        <Skeleton className="w-full h-8 rounded-md" />
        <Skeleton className="w-full h-8 rounded-md" />
        <Skeleton className="w-full h-8 rounded-md" />
        <div className="flex space-x-4">
          <Skeleton className="w-1/2 h-12 rounded-md" />
          <Skeleton className="w-1/2 h-12 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SettingsLoading;
