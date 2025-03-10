import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { addressControl, addressState } from "@/config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogForm } from "@/components/form/DialogForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
export function AddressSelection() {
  const [isOpen, setIsOpen] = useState(false);
  const { addAddress, address } = useUserStore();
  console.log(address);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <button
          className="btn btn-primary text-xs rounded-md"
          onClick={() => setIsOpen(true)}
        >
          Change Address
        </button>
        <DialogContent className="sm:max-w-lg p-4 rounded-lg">
          <DialogTitle className="flex items-center justify-end">
            <DialogForm
              button="Add Address"
              action={addAddress}
              state={addressState}
              title="Form New Address"
              control={addressControl}
            />
          </DialogTitle>
          <ScrollArea className="h-96 p-4">
            {address.map((add) => (
              <div
                className={cn(
                  add.isMain ? "border-blue-500" : "border-muted",
                  "p-2 rounded-lg border mb-4"
                )}
                key={add.id}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <h5 className="capitalize">{add.name}</h5>
                </div>
                <div className="text-sm">{add.phone}</div>
                <div className="text-sm mb-2">
                  {add.address} {add.province} {add.city}
                  {address.zipcode}
                </div>
                {!add.isMain && (
                  <button className="btn btn-primary text-xs rounded-md">
                    Select
                  </button>
                )}
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
