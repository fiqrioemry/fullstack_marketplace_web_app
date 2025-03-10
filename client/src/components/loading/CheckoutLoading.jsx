import { Skeleton } from "@/components/ui/skeleton";
import CheckoutLayout from "../checkout/checkoutLayout";

const CheckoutLoading = () => {
  return (
    <CheckoutLayout>
      <div className="col-span-2 space-y-8">
        <div className="rounded-md p-4 bg-background flex gap-4">
          <Skeleton className="h-20 w-20 rounded-md" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-60 rounded-md" />
          </div>
        </div>
        <div className="rounded-md p-4 bg-background flex gap-4">
          <Skeleton className="h-20 w-20 rounded-md" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-60 rounded-md" />
          </div>
        </div>
        <div className="rounded-md p-4 bg-background flex gap-4">
          <Skeleton className="h-20 w-20 rounded-md" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-60 rounded-md" />
          </div>
        </div>
      </div>
      <div className="col-span-1 space-y-8">
        <div className="rounded-md p-4 bg-background space-y-4">
          <Skeleton className="h-7 w-24 rounded-md" />
          <Skeleton className="h-7 rounded-md" />
          <Skeleton className="h-7 rounded-md" />
          <Skeleton className="h-7 rounded-md" />
          <Skeleton className="h-12 rounded-md" />
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutLoading;
