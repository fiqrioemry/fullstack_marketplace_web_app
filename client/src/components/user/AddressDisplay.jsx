import { useUserStore } from "@/store/useUserStore";
import { addressControl, addressState } from "@/config";
import AddressCard from "@/components/card/AddressCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogForm } from "@/components/form/DialogForm";

const AddressDisplay = () => {
  const { addAddress, address } = useUserStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <DialogForm
          button="Add Address"
          action={addAddress}
          state={addressState}
          title="Form New Address"
          control={addressControl}
        />
      </div>
      {address.length === 0 ? (
        <div className="h-96 border border-gray-200 flex items-center justify-center">
          <h4>You dont have any address, Try to add one</h4>
        </div>
      ) : (
        <ScrollArea className="h-[30rem] bg-muted p-4">
          {address.map((addrs) => (
            <AddressCard address={addrs} key={addrs.id} />
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default AddressDisplay;
