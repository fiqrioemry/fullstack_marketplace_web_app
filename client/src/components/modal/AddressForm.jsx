/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormControls from "../form/FormControl";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ModalContainer({
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
        <DialogContent variant="options" className=" sm:max-w-[425px]">
          <div className="space-y-6">
            <h4>{formTitle}</h4>
            <ScrollArea className="h-60">
              <form onSubmit={handleSubmit} className="space-y-6 px-2">
                <FormControls
                  formData={formData}
                  handleChange={handleChange}
                  formControls={formControls}
                />
                <Button className="w-full" type="submit">
                  Save
                </Button>
              </form>
            </ScrollArea>
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
