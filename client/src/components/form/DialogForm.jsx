/* eslint-disable react/prop-types */
import InputForm from "./InputForm";
import InputButton from "./InputButton";
import { Button } from "@/components/ui/button";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useState, useCallback, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function DialogForm({
  title,
  state,
  control,
  action,
  button,
  variant,
  param = null,
}) {
  const formik = useFormSchema(state, control, action, param);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isFormDirty = useMemo(() => formik.dirty, [formik.dirty]);

  const resetAndCloseDialog = useCallback(() => {
    formik.resetForm();
    setIsOpen(false);
  }, [formik]);

  const handleCancel = useCallback(() => {
    if (isFormDirty) setShowConfirmation(true);
    else resetAndCloseDialog();
  }, [isFormDirty, resetAndCloseDialog]);

  const handleSave = useCallback(async () => {
    await formik.submitForm();
    if (formik.isValid) resetAndCloseDialog();
  }, [formik, resetAndCloseDialog]);

  const handleCloseDialog = useCallback(() => {
    if (isFormDirty) setShowConfirmation(true);
    else resetAndCloseDialog();
  }, [isFormDirty, resetAndCloseDialog]);

  const handleConfirmation = useCallback(
    (confirmed) => {
      if (confirmed) resetAndCloseDialog();
      setShowConfirmation(false);
    },
    [resetAndCloseDialog]
  );

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => (!open ? handleCloseDialog() : setIsOpen(open))}
      >
        <Button variant={variant} onClick={() => setIsOpen(true)}>
          {button}
        </Button>
        <DialogContent className="sm:max-w-[425px] p-0">
          <div className="text-center mt-4">
            <h4>{title}</h4>
            <p className="text-gray-600">
              Save button will active once all fields are filled or Changes
            </p>
          </div>
          <ScrollArea className="h-72 border">
            <div className="p-4">
              <InputForm formik={formik} formControl={control}>
                <div className="flex justify-end gap-2 p-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <InputButton
                    type="button"
                    formik={formik}
                    action={handleSave}
                    title="save changes"
                  />
                </div>
              </InputForm>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="text-center mt-4">
            <h4>Unsaved Changes</h4>
            <p className="text-gray-600">
              You have unsaved changes. Are you sure you want to discard them?
            </p>
          </div>
          <div className="flex justify-end gap-2 p-2">
            <Button
              variant="destructive"
              onClick={() => handleConfirmation(true)}
            >
              Yes, discard changes
            </Button>
            <Button variant="outline" onClick={() => handleConfirmation(false)}>
              No, keep changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
