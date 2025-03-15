/* eslint-disable react/prop-types */
import { useUserStore } from "@/store/useUserStore";
import { DialogForm } from "@/components/form/DialogForm";

const orderState = {
  shipmentNumber: "",
  message: "",
};

const orderControl = [
  {
    name: "shipmentNumber",
    label: "shipment number",
    type: "text",
    placeholder: "Enter Shipment number from courier",
    component: "input-text",
  },
  {
    name: "message",
    label: "message",
    type: "text",
    placeholder: "Enter a message for customer",
    component: "input-text",
  },
];

const ConfirmUserOrder = ({ orderId }) => {
  const { confirmUserOrder } = useUserStore();

  return (
    <DialogForm
      size="sm"
      param={orderId}
      state={orderState}
      control={orderControl}
      action={confirmUserOrder}
      textButton="Confirm order"
      title="Confirm Order Completion"
    />
  );
};

export default ConfirmUserOrder;
