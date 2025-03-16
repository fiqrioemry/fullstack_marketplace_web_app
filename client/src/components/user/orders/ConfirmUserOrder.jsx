/* eslint-disable react/prop-types */
import { useUserStore } from "@/store/useUserStore";
import { DialogForm } from "@/components/form/DialogForm";

const orderState = {
  status: "",
  message: "",
};

const orderControl = [
  {
    name: "status",
    label: "order confirmation",
    type: "text",
    placeholder: "select confirmation",
    component: "select",
    option: ["complete order", "request for refund"],
  },
  {
    name: "message",
    label: "message",
    type: "text",
    placeholder: "Leave a message for seller",
    component: "input-text",
  },
];

const ConfirmUserOrder = ({ orderId }) => {
  const { confirmOrderDelivery } = useUserStore();

  return (
    <DialogForm
      size="sm"
      param={orderId}
      state={orderState}
      control={orderControl}
      action={confirmOrderDelivery}
      textButton="Confirm order"
      title="Confirm Order Completion"
    />
  );
};

export default ConfirmUserOrder;
