/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UploadLoading from "../loading/UploadLoading";

export function DeleteForm({
  title,
  onClick,
  description,
  size = "lg",
  loading = false,
  variant = "delete",
  textButton = "delete",
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          {textButton}
        </Button>
      </DialogTrigger>
      <DialogTitle>
        {loading ? (
          <UploadLoading />
        ) : (
          <DialogContent variant="options" className=" sm:max-w-[525px]">
            <div className="space-y-6">
              <h4>{title}</h4>
              <p>{description}</p>
              <div className="flex justify-end items-center space-x-4">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="delete" onClick={onClick}>
                    submit
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        )}
      </DialogTitle>
    </Dialog>
  );
}
