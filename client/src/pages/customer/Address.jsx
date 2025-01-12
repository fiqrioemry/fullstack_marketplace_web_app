import { useEffect } from "react";
import { Plus } from "lucide-react";
import UserAddress from "../UserAddress";
import { useUserStore } from "../../store/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHandleForm } from "../../hooks/useHandleForm";
import { AddressForm } from "../../components/modal/AddressForm";
import { controlAddressForm, initialAddressForm } from "../../config";
import UserAddressSkeleton from "../../components/loading/UserAddressSkeleton";

const Address = () => {
  const { formData, setFormData, handleChange } =
    useHandleForm(initialAddressForm);
  const {
    address,
    getUserAddress,
    addUserAddress,
    deleteUserAddress,
    updateUserAddress,
  } = useUserStore();

  useEffect(() => {
    getUserAddress();
  }, [getUserAddress]);

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    addUserAddress(formData);
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    updateUserAddress(formData);
  };

  const handleDeleteAddress = (e, addressId) => {
    e.preventDefault();
    deleteUserAddress(addressId);
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
                  <UserAddress
                    data={item}
                    key={item.id}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    formControls={controlAddressForm}
                    handleUpdateAddress={handleUpdateAddress}
                    handleDeleteAddress={handleDeleteAddress}
                  />
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
