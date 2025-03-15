import { Skeleton } from "@/components/ui/skeleton";

const NotificationsLoading = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-2">
        <Skeleton className="h-9 w-32 rounded-md" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
      <Skeleton className="w-full h-40 rounded-md" />
      <Skeleton className="w-full h-40 rounded-md" />
    </div>
  );
};

export default NotificationsLoading;
