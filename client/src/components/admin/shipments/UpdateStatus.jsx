/* eslint-disable react/prop-types */
import { Edit } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import { DialogForm } from "@/components/form/DialogForm";

const shipmentState = {
  status: "",
  message: "",
};
const shipmentControl = [
  {
    name: "status",
    label: "shipment status",
    type: "text",
    component: "select",
    placeholder: "Select a confirmation delivery",
    option: ["delivered", "canceled", "returned"],
  },
  {
    name: "status",
    label: "message",
    type: "text",
    component: "select",
    placeholder: "Select a confirmation message",
    option: ["messsage 1...", "message 2...", "message 3..."],
  },
];

const UpdateStatus = ({ shipmentId }) => {
  const { updateShipmentStatus } = useAdminStore();

  return (
    <DialogForm
      size="icon"
      variant="edit"
      param={shipmentId}
      state={shipmentState}
      textButton={<Edit />}
      control={shipmentControl}
      action={updateShipmentStatus}
      title={"Shipment Status Confirmation"}
    />
  );
};

export default UpdateStatus;
