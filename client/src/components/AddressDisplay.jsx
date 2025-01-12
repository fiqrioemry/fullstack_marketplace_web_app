/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AddressForm } from "./modal/AddressForm";
import { useUserStore } from "../store/useUserStore";
import { useHandleForm } from "../hooks/useHandleForm";
import AddressSkeleton from "./loading/AddressSkeleton";
import { useProvider } from "../context/GlobalProvider";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmationBox } from "./modal/ConfirmationBox";
import { controlEditAddressForm, initialAddressForm } from "../config";

const AddressDisplay = ({ address }) => {
  const { currentPath } = useProvider();
  const isCurrent = currentPath === "/cart/checkout";
  const { formData, setFormData, handleChange } =
    useHandleForm(initialAddressForm);
  const { updateUserAddress, deleteUserAddress, isAddressLoading } =
    useUserStore();

  useEffect(() => {
    setFormData(address);
  }, [address, setFormData]);

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    updateUserAddress(formData, address.id);
  };

  const handleDeleteAddress = (e) => {
    e.preventDefault();
    deleteUserAddress();
  };

  if (isAddressLoading) return <AddressSkeleton />;

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h4>Shipment Address</h4>

        <div className="flex items-center space-x-2 text-sm">
          <span>{address.name}</span>
          {address.isMain && (
            <span className="bg-primary px-3 py-[0.5px] text-white rounded-md">
              main
            </span>
          )}
        </div>
        <div>{address.phone}</div>
        <p>
          {address.address} {address.province} {address.city} {address.zipcode}
        </p>

        {isCurrent && (
          <div className="flex space-x-4">
            <Button>Select Address</Button>
          </div>
        )}
        {!isCurrent && (
          <div className="flex space-x-4">
            <AddressForm
              formData={formData}
              buttonTitle="Edit Address"
              formTitle={"Edit Address"}
              handleChange={handleChange}
              handleSubmit={handleUpdateAddress}
              formControls={controlEditAddressForm}
            />

            {!address.isMain && (
              <ConfirmationBox
                title="Delete Address"
                buttonVariant="destructive"
                buttonConfirm="Delete"
                buttonTitle="Delete Address"
                handleSubmit={handleDeleteAddress}
                description="Are you sure you want to delete this address? Deleted addresses cannot be restored."
              />
            )}

            {!address.isMain && (
              <ConfirmationBox
                title="Select main address"
                buttonVariant="default"
                buttonConfirm="Select as main"
                buttonTitle="Select as main"
                handleSubmit={handleUpdateAddress}
                description={`Are you sure you want to set this address as your primary address? \n\n You can only select one primary address.`}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressDisplay;
