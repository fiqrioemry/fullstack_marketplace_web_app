/* eslint-disable react/prop-types */
import { useShopStore } from "@/store/useShopStore";
import { DialogForm } from "@/components/form/DialogForm";

const cancelOrderState = {
  cancel_reason: "",
};
const cancelOrderControl = [
  {
    type: "text",
    name: "cancel_order",
    component: "input-text",
    label: "Reason for cancelation",
    placeholder: "Write the cancelation reason here",
  },
];

const CancelOrder = ({ orderId }) => {
  const { cancelStoreOrder } = useShopStore();

  return (
    <DialogForm
      size="sm"
      param={orderId}
      variant="outline"
      textButton="Cancel order"
      state={cancelOrderState}
      action={cancelStoreOrder}
      control={cancelOrderControl}
      title={"Order Cancelation Confirmation"}
    />
  );
};

export default CancelOrder;
