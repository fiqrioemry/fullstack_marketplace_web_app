import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { addressControl, addressState } from "@/config";
import AddressCard from "@/components/user/AddressCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogForm } from "@/components/form/DialogForm";
import AddressLoading from "@/components/loading/AddressLoading";

const Address = () => {
  const { getAddress, addAddress, address } = useUserStore();

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  if (!address) return <AddressLoading />;

  return (
    <div className="space-y-4">
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
        <div className="h-96 border bg-gray-100 flex items-center justify-center">
          <h4>You dont have any address, Try to add one</h4>
        </div>
      ) : (
        <ScrollArea className="h-96 flex items-center justify-center bg-gray-100 p-4">
          {address.map((addrs) => (
            <AddressCard address={addrs} key={addrs.id} />
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default Address;
