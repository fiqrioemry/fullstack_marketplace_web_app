import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useUserStore } from "../../store/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHandleForm } from "../../hooks/useHandleForm";
import { AddressForm } from "../../components/modal/AddressForm";
import { controlAddressForm, initialAddressForm } from "../../config";
import UserAddressSkeleton from "../../components/loading/UserAddressSkeleton";
import AddressDisplay from "../../components/AddressDisplay";

const Address = () => {
  const { formData, handleChange } = useHandleForm(initialAddressForm);
  const { address, getUserAddress, addUserAddress } = useUserStore();

  useEffect(() => {
    getUserAddress();
  }, [getUserAddress]);

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    addUserAddress(formData);
  };

  return (
    <div className="space-y-4">
      {!address && <UserAddressSkeleton />}

      {address && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <div>
              <AddressForm
                formData={formData}
                handleChange={handleChange}
                formTitle={"Create New Address"}
                formControls={controlAddressForm}
                handleSubmit={handleAddNewAddress}
                buttonTitle={
                  <>
                    <Plus />
                    <span>Add new address</span>
                  </>
                }
              />
            </div>
          </div>
          {address.length !== 0 ? (
            <ScrollArea className="h-96 bg-muted p-4">
              <div className="space-y-4">
                {address.map((item) => (
                  <AddressDisplay address={item} key={item.id} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="h-96  default_border flex items-center justify-center">
              <h4>You Dont Have an Address, Try to add one</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Address;
