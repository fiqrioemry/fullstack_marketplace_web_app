/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useShopStore } from "@/store/useShopStore";
import { DialogDescription } from "@radix-ui/react-dialog";

export function CancelOrder({ orderId }) {
  const { cancelStoreOrder } = useShopStore();

  const handleCancelOrder = () => {
    cancelStoreOrder(orderId);
  };

  return (
    <Dialog>
      <DialogTrigger className="btn btn-nav w-full">Cancel Order</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center mb-4">
          Order Cancellation
        </DialogTitle>
        <DialogDescription className="text-center mb-4">
          Are you sure want to cancel this order
        </DialogDescription>
        <div className="flex justify-end items-center gap-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="delete" onClick={handleCancelOrder}>
              Confirm
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
