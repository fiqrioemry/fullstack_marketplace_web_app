/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteBox({
  title,
  description,
  action,
  data,
  size,
  variant = "delete",
  button = "delete",
}) {
  const handleSubmit = () => {
    action(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          {button}
        </Button>
      </DialogTrigger>
      <DialogTitle>
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
                <Button variant="delete" onClick={handleSubmit}>
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
