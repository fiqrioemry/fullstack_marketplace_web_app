/* eslint-disable react/prop-types */

import { DialogForm } from "@/components/form/DialogForm";
import { useUserStore } from "../../../store/useUserStore";

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
  const { cancelTransaction } = useUserStore();

  return (
    <DialogForm
      size="sm"
      variant="outline"
      param={transactionId}
      textButton="Cancel Transaction"
      state={cancelTransactionState}
      action={cancelTransaction}
      control={cancelTransactionControl}
      title={"Transaction Cancel Confirmation"}
    />
  );
};

export default CancelTransaction;
