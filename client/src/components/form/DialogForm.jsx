/* eslint-disable react/prop-types */
import FormInput from "./FormInput";
import { Button } from "@/components/ui/button";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useState, useCallback, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import UploadLoading from "@/components/loading/UploadLoading";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function DialogForm({
  title,
  state,
  control,
  action,
  size = "lg",
  param = null,
  loading = false,
  variant = "edit",
  textButton = "edit",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const formik = useFormSchema(action, state, control, param);
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
        <Button variant={variant} size={size} onClick={() => setIsOpen(true)}>
          {textButton}
        </Button>
        <DialogTitle>
          {loading ? (
            <UploadLoading />
          ) : (
            <DialogContent className="sm:max-w-[425px] p-0 rounded-lg">
              <div className="text-center mt-4">
                <h4>{title}</h4>
                <p className="text-gray-600 text-sm font-normal">
                  Submit button will active once all fields are filled or
                  Changes
                </p>
              </div>

              <ScrollArea className="max-h-96 border pb-8">
                <div className="p-4">
                  <FormInput
                    formik={formik}
                    formControl={control}
                    inputStyle={"h-40 md:h-[4rem]"}
                  >
                    <div className="flex gap-2 p-2 absolute bottom-0 right-0 left-0 bg-background border-t">
                      <Button
                        type="button"
                        variant="delete"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleSave}
                        disabled={!(formik.isValid && formik.dirty)}
                      >
                        submit
                      </Button>
                    </div>
                  </FormInput>
                </div>
              </ScrollArea>
            </DialogContent>
          )}
        </DialogTitle>
      </Dialog>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="w-full sm:max-w-xl rounded-lg">
          <div className="text-center mt-4">
            <DialogTitle>
              <h4>Unsaved Changes</h4>
            </DialogTitle>
            <p className="text-gray-600">
              You have unsaved changes. Are you sure you want to discard them?
            </p>
          </div>
          <div className="flex justify-center gap-2 ">
            <Button variant="delete" onClick={() => handleConfirmation(true)}>
              Yes, discard changes
            </Button>
            <Button onClick={() => handleConfirmation(false)}>
              No, keep changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
