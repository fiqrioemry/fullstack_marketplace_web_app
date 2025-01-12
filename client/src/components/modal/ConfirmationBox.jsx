/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmationBox({
  title,
  description,
  buttonConfirm,
  buttonVariant,
  buttonTitle,
  handleSubmit,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>{buttonTitle}</Button>
      </DialogTrigger>
      <DialogTitle>
        <DialogContent variant="options" className=" sm:max-w-[525px]">
          <div className="space-y-6">
            <h4>{title}</h4>
            <p>{description}</p>
            <div className="flex justify-end items-center space-x-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant={buttonVariant}
                  onClick={handleSubmit}
                  type="button"
                >
                  {buttonConfirm}
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
