import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const AddressCardLoading = () => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <Skeleton className="h-5 w-60 rounded-md" />
        <Skeleton className="h-5 w-60 rounded-md" />
        <Skeleton className="h-5 rounded-md" />
        <Skeleton className="h-5 rounded-md" />
        <div className="flex space-x-4">
          <Skeleton className="h-9 w-32 rounded-md" />
          <Skeleton className="h-9 w-42 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCardLoading;
