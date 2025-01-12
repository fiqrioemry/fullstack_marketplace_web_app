/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmationBox({
  buttonTitle,
  handleSubmit,
  formData,
  handleChange,
  formControls,
  formTitle,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{buttonTitle}</Button>
      </DialogTrigger>
      <DialogTitle>
        <DialogContent variant="options" className=" sm:max-w-[325px]">
          <div className="space-y-6">
            <h4>{title}</h4>
            <p>{description}</p>
            <div>
              <Button></Button>
            </div>
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
