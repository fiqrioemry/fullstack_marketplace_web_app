/* eslint-disable react/prop-types */
import { addressControl } from "@/config";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent } from "@/components/ui/card";
import { DialogUpdateForm } from "./form/DialogUpdateForm";

const AddressCard = ({ address }) => {
  const { updateAddress, updating } = useUserStore();

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h4>Shipment Address</h4>
        <div className="flex items-center space-x-2 text-sm">
          <h5 className="capitalize">{address.name}</h5>
          {address.isMain && (
            <span className="bg-primary px-3 py-[0.5px] text-white rounded-md">
              main
            </span>
          )}
        </div>
        <div className="text-sm">{address.phone}</div>
        <div className="text-sm">
          {address.address} {address.province} {address.city} {address.zipcode}
        </div>
        <div>
          <DialogUpdateForm
            title={"Edit"}
            data={address}
            loading={updating}
            action={updateAddress}
            formControl={addressControl}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
