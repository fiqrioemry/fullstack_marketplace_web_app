import { useUserStore } from "@/store/useUserStore";
import { addressControl, addressState } from "@/config";
import { DialogForm } from "@/components/form/DialogForm";
import { PlusCircle } from "lucide-react";

const AddAressButton = () => {
  return (
    <>
      <PlusCircle />

      <span>Add Address</span>
    </>
  );
};

const AddAddress = () => {
  const { addAddress, loading } = useUserStore();

  return (
    <div className="flex justify-end">
      <DialogForm
        variant="primary"
        loading={loading}
        action={addAddress}
        state={addressState}
        title="Form New Address"
        control={addressControl}
        textButton={<AddAressButton />}
      />
    </div>
  );
};

export default AddAddress;
