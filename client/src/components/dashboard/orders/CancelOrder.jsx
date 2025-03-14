/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteForm({
  title,
  onClick,
  description,
  size = "lg",
  variant = "delete",
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          Cancel
        </Button>
      </DialogTrigger>
      <DialogTitle>
        <DialogContent variant="options" className=" sm:max-w-[525px]">
          <div className="space-y-6">
            <h4>Order Cancellation</h4>
            <p>Are you sure want to cancel this order</p>
            <div className="flex justify-end items-center space-x-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="delete" onClick={onClick}>
                  delete
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
