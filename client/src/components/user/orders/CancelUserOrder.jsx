/* eslint-disable react/prop-types */
import { useUserStore } from "@/store/useUserStore";
import { DialogForm } from "@/components/form/DialogForm";

const cancelOrderState = {
  cancel_reason: "",
};
const cancelOrderControl = [
  {
    type: "text",
    name: "cancel_reason",
    component: "input-text",
    label: "Reason",
    placeholder: "Write the cancelation reason here",
  },
];

const CancelUserOrder = ({ orderId }) => {
  const { cancelUserOrder } = useUserStore();

  return (
    <DialogForm
      size="sm"
      param={orderId}
      variant="outline"
      textButton="Cancel order"
      state={cancelOrderState}
      action={cancelUserOrder}
      control={cancelOrderControl}
      title={"Order Cancelation Confirmation"}
    />
  );
};

export default CancelUserOrder;
