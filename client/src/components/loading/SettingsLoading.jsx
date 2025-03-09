import { Skeleton } from "@/components/ui/skeleton";

const SettingsLoading = () => {
  return (
    <div className="min-h-svh grid grid-cols-12 gap-4 p-4">
      <div className=" col-span-4 flex justify-center">
        <Skeleton className="h-40 w-40 rounded-md" />
      </div>

      <div className="col-span-8 space-y-4">
        <Skeleton className="w-full h-7 rounded-md" />
        <Skeleton className="w-full h-7 rounded-md" />
        <Skeleton className="w-full h-7 rounded-md" />
        <Skeleton className="w-full h-7 rounded-md" />
      </div>
    </div>
  );
};

export default SettingsLoading;
