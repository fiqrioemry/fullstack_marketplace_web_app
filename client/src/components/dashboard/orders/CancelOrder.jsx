/* eslint-disable react/prop-types */
import { useShopStore } from "@/store/useShopStore";
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

const CancelOrder = ({ orderId }) => {
  const { cancelStoreOrder, loading } = useShopStore();

  return (
    <DialogForm
      size="sm"
      param={orderId}
      variant="outline"
      loading={loading}
      textButton="Cancel order"
      state={cancelOrderState}
      action={cancelStoreOrder}
      control={cancelOrderControl}
      title={"Order Cancelation Confirmation"}
    />
  );
};

export default CancelOrder;
