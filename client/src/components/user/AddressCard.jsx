/* eslint-disable react/prop-types */
import { addressControl } from "@/config";
import { useUserStore } from "@/store/useUserStore";
import { DialogForm } from "@/components/form/DialogForm";
import { DeleteBox } from "@/components/modal/DeleteBox";
import { Card, CardContent } from "@/components/ui/card";

const AddressCard = ({ address }) => {
  const { updateAddress, deleteAddress } = useUserStore();

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
            variant="edit"
            button="Edit"
            state={address}
            title="Edit Address"
            param={address.id}
            action={updateAddress}
            control={addressControl}
          />

          {!address.isMain && (
            <DeleteBox
              data={address.id}
              action={deleteAddress}
              title="Address deletion"
              description="Are you sure want to delete this address ?"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
