/* eslint-disable react/prop-types */
import { useUserStore } from "@/store/useUserStore";
import { addressControl, addressState } from "@/config";
import AddressCard from "@/components/card/AddressCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogForm } from "@/components/form/DialogForm";

const Address = ({ address }) => {
  const { addAddress } = useUserStore();

  return (
    <div>
      <div className="space-y-6">
        <div className="flex justify-end">
          <div>
            <DialogForm
              title="Form New Address"
              button="Add Address"
              action={addAddress}
              state={addressState}
              control={addressControl}
            />
          </div>
        </div>
        {address.length === 0 ? (
          <div className="h-96 default_border flex items-center justify-center">
            <h4>You Dont Have an Address, Try to add one</h4>
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
    </div>
  );
};

export default Address;
