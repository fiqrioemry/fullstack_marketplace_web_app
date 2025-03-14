/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useShopStore } from "@/store/useShopStore";

import { Button } from "@/components/ui/button";
import { useFormSchema } from "@/hooks/useFormSchema";
import FormInput from "@/form/FormInput";
import InputButton from "@/form/InputButton";

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

export function ProceedOrder({ orderId }) {
  const { proceedStoreOrder, loading } = useShopStore();
  const orderForm = useFormSchema(
    proceedStoreOrder,
    orderState,
    orderControl,
    orderId
  );

  return (
    <Dialog>
      <DialogTrigger className="btn btn-nav w-full">
        Proceed Order
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center mb-4">Order Process</DialogTitle>
        <DialogDescription className="text-center mb-4">
          To Process this order, please enter the Order tracking Number from
          courier
        </DialogDescription>
        <div>
          <FormInput formik={orderForm} formControl={orderControl}>
            <div>
              <Button type="button">Cancel</Button>
              <InputButton
                title="proceed order"
                formik={orderForm}
                loading={loading}
              />
            </div>
          </FormInput>
        </div>
      </DialogContent>
    </Dialog>
  );
}
