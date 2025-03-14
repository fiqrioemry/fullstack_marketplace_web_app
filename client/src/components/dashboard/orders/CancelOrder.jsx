/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function CancelOrder({ onClick, size = "lg", variant = "delete" }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Cancel Order</div>
      </DialogTrigger>
      <DialogTitle>
        <DialogContent variant="options" className=" sm:max-w-[525px]">
          <div className="space-y-6">
            <h4>Order Cancellation</h4>
            <p>Are you sure want to cancel this order</p>
            <div className="flex justify-end items-center space-x-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="delete" onClick={onClick}>
                  Confirm
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
