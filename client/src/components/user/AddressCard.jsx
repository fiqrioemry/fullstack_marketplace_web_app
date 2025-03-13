/* eslint-disable react/prop-types */
import { addressControl } from "@/config";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent } from "@/components/ui/card";
import { DialogForm } from "@/components/form/DialogForm";
import { DeleteForm } from "@/components/form/DeleteForm";

const AddressCard = ({ address }) => {
  const { updateAddress, deleteAddress } = useUserStore();

  const handleDelete = () => {
    deleteAddress(address);
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4 space-y-2">
        <h4>Shipment Address</h4>
        <div className="flex items-center space-x-2 text-sm">
          <h5 className="capitalize">{address.name}</h5>
          {address.isMain && (
            <span className="bg-primary h-4 w-8 text-xs flex items-center justify-center text-white rounded-md">
              main
            </span>
          )}
        </div>
        <div className="text-sm">{address.phone}</div>
        <div className="text-sm">
          {address.address} {address.province} {address.city} {address.zipcode}
        </div>
        <div className="flex gap-2">
          <DialogForm
            size="lg"
            state={address}
            param={address.id}
            title="Edit Address"
            action={updateAddress}
            control={addressControl}
          />

          {!address.isMain && (
            <DeleteForm
              onClick={handleDelete}
              title="Address Deleteion"
              description="Are you sure want to delete this address ?"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
