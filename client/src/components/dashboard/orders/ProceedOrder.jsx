/* eslint-disable react/prop-types */
import { useShopStore } from "@/store/useShopStore";
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

const ProceedOrder = ({ orderId }) => {
  const { proceedStoreOrder } = useShopStore();

  return (
    <DialogForm
      size="sm"
      param={orderId}
      state={orderState}
      control={orderControl}
      action={proceedStoreOrder}
      textButton="proceed order"
      title="Proceed order to shipment"
    />
  );
};

export default ProceedOrder;
