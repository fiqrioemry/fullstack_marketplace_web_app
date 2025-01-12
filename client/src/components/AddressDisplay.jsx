/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { useProvider } from "../context/GlobalProvider";
import { Card, CardContent } from "@/components/ui/card";
import { useHandleForm } from "../hooks/useHandleForm";
import { controlAddressForm, initialAddressForm } from "../config";
import { useEffect } from "react";
import { AddressForm } from "./modal/AddressForm";

const AddressDisplay = ({ address }) => {
  const { currentPath } = useProvider();
  const { updateUserAddress, deleteUserAddress } = useProvider();
  const { formData, setFormData, handleChange } =
    useHandleForm(initialAddressForm);
  const isCurrent = currentPath === "/cart/checkout";

  useEffect(() => {
    setFormData(address);
  }, [address, setFormData]);

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    updateUserAddress();
  };

  const handleDeleteAddress = (e) => {
    e.preventDefault();
    deleteUserAddress();
  };
  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h4>Shipment Address</h4>

        <div className="flex items-center space-x-2 text-sm">
          <span>{address.name}</span>
          <span className="bg-primary px-3 py-[0.5px] text-white rounded-md">
            main
          </span>
        </div>
        <div>{address.phone}</div>
        <p>
          {address.address} {address.province} {address.city} {address.zipcode}
        </p>

        {!isCurrent && (
          <div className="flex space-x-4">
            <Button>Select Address</Button>
          </div>
        )}
        {isCurrent && (
          <div className="flex space-x-4">
            <AddressForm
              formData={formData}
              buttonTitle="Edit Address"
              formTitle={"Edit Address"}
              handleChange={handleChange}
              formControls={controlAddressForm}
              handleSubmit={handleUpdateAddress}
            />
            <AddressForm
              formData={formData}
              buttonTitle="Delete Address"
              formTitle={"Delete Address"}
              handleChange={handleChange}
              formControls={controlAddressForm}
              handleSubmit={handleUpdateAddress}
            />
            <Button>Select as main </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressDisplay;
