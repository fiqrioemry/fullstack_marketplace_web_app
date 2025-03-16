/* eslint-disable react/prop-types */
import { useUserStore } from "@/store/useUserStore";
import { DialogForm } from "@/components/form/DialogForm";

const orderCancelState = {
  cancel_reason: "",
};

const orderCancelControl = [
  {
    type: "text",
    name: "cancel_reason",
    component: "input-text",
    label: "Reason",
    placeholder: "Write the cancelation reason here",
  },
];

const OrderCancel = ({ orderId }) => {
  const { cancelUserOrder, loading } = useUserStore();

  return (
    <DialogForm
      size="sm"
      param={orderId}
      variant="outline"
      loading={loading}
      textButton="Cancel order"
      state={orderCancelState}
      action={cancelUserOrder}
      control={orderCancelControl}
      title={"Order Cancelation Confirmation"}
    />
  );
};

export default OrderCancel;
