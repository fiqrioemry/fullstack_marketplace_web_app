/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";

export function CancelOrder({ onClick }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn btn-nav w-full">Cancel Order</button>
      </DialogTrigger>

      <DialogContent variant="options" className=" sm:max-w-[525px]">
        <div className="space-y-6">
          <DialogHeader>
            <DialogTitle>Order Cancellation</DialogTitle>
            <DialogDescription>
              Are you sure want to cancel this order
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end items-center space-x-4">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="delete" onClick={onClick}>
                Confirm
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
