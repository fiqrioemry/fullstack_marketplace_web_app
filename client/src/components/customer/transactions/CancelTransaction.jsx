/* eslint-disable react/prop-types */

import { useUserStore } from "@/store/useUserStore";
import { DialogForm } from "@/components/form/DialogForm";

const cancelTransactionState = {
  cancel_reason: "",
};

const cancelTransactionControl = [
  {
    type: "text",
    name: "cancel_reason",
    component: "input-text",
    label: "Reason",
    placeholder: "Write the cancelation reason here",
  },
];

const CancelTransaction = ({ transactionId }) => {
  const { cancelTransaction, loading } = useUserStore();

  return (
    <DialogForm
      size="sm"
      variant="outline"
      loading={loading}
      param={transactionId}
      action={cancelTransaction}
      state={cancelTransactionState}
      textButton="Cancel Transaction"
      control={cancelTransactionControl}
      title={"Transaction Cancel Confirmation"}
    />
  );
};

export default CancelTransaction;
