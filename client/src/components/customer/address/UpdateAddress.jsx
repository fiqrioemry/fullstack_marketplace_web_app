/* eslint-disable react/prop-types */
import { Edit } from "lucide-react";
import { addressControl } from "@/config";
import { useAdminStore } from "@/store/useAdminStore";
import { DialogForm } from "@/components/form/DialogForm";

const UpdateAddress = ({ address }) => {
  const { updateAddress, loading } = useAdminStore();

  return (
    <div className="mb-2">
      <DialogForm
        size="icon"
        variant="edit"
        state={address}
        param={address.id}
        loading={loading}
        textButton={<Edit />}
        action={updateAddress}
        control={addressControl}
        title={"Update Address"}
      />
    </div>
  );
};

export default UpdateAddress;
