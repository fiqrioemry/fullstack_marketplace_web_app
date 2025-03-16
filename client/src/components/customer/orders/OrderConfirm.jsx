/* eslint-disable react/prop-types */
import { useUserStore } from "@/store/useUserStore";
import { DialogForm } from "@/components/form/DialogForm";

const orderConfirmState = {
  status: "",
  message: "",
};

const orderConfirmControl = [
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

const OrderConfirm = ({ orderId }) => {
  const { confirmOrderDelivery, loading } = useUserStore();

  return (
    <DialogForm
      size="sm"
      param={orderId}
      loading={loading}
      state={orderConfirmState}
      textButton="Confirm order"
      control={orderConfirmControl}
      action={confirmOrderDelivery}
      title="Confirm Order Completion"
    />
  );
};

export default OrderConfirm;
