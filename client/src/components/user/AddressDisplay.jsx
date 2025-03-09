import { useUserStore } from "@/store/useUserStore";
import { addressControl, addressState } from "@/config";
import AddressCard from "@/components/card/AddressCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogForm } from "@/components/form/DialogForm";

const AddressDisplay = () => {
  const { addAddress, message, address } = useUserStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div>
          <DialogForm
            button="Add Address"
            action={addAddress}
            state={addressState}
            title="Form New Address"
            control={addressControl}
          />
        </div>
      </div>
      {address.length === 0 ? (
        <div className="h-96 default_border flex items-center justify-center">
          <h4>{message}</h4>
        </div>
      ) : (
        <ScrollArea className="h-96 bg-muted p-4">
          <div className="space-y-4">
            {address.map((item) => (
              <AddressCard address={item} key={item.id} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default AddressDisplay;
