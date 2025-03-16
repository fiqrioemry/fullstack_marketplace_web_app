import { useUserStore } from "@/store/useUserStore";
import { addressControl, addressState } from "@/config";
import { DialogForm } from "@/components/form/DialogForm";

const AddAddress = () => {
  const { addAddress, loading } = useUserStore();

  return (
    <div className="flex justify-end">
      <DialogForm
        variant="primary"
        action={addAddress}
        state={addressState}
        title="Form New Address"
        textButton="Add Address"
        loading={loading}
        control={addressControl}
      />
    </div>
  );
};

export default AddAddress;
