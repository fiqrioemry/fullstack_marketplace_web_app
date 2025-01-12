/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { AddressForm } from "../components/modal/AddressForm";
import { useEffect } from "react";

const UserAddress = ({
  data,
  formData,
  handleChange,
  formControls,
  setFormData,
  handleDeleteAddress,
  handleUpdateAddress,
}) => {
  useEffect(() => {
    setFormData(data);
  });
  return (
    <div className="bg-background rounded-md shadow-md space-y-2 p-4">
      <h4 className="text-foreground/50">Address</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <span className="capitalize font-semibold">{data.name}</span>
          {data.isMain && (
            <span className="text-xs py-[0.5px] px-4 text-background bg-primary default_border">
              main
            </span>
          )}
        </div>
        <div>{data.phone}</div>
      </div>
      <p className="capitalize">
        {data.address}, {data.province}, {data.city}, {data.zipcode}
      </p>
      <div className="flex space-x-4">
        <AddressForm
          formData={formData}
          handleChange={handleChange}
          formTitle={"Create New Address"}
          formControls={formControls}
          handleSubmit={handleUpdateAddress}
          buttonTitle={"Edit Address"}
        />

        {!data.isMain && <Button>Select as main</Button>}
      </div>
    </div>
  );
};

export default UserAddress;
