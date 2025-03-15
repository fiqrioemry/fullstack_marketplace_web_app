import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";

const CancelPolicy = () => {
  return (
    <Dialog>
      <DialogTrigger className="py-1 px-2 rounded-md border">
        <Ellipsis />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex justify-center items-center mb-4">
          <DialogTitle>Cancellation Policy</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm text-justify">
          <p>
            1. Transactions can only be canceled if the payment status is{" "}
            <strong>pending</strong> or <strong>paid</strong>.
          </p>
          <p>
            2. If the payment status is <strong>paid</strong>, cancellation is
            only possible within <strong>2 hours</strong> from the transaction
            creation time.
          </p>
          <p>
            3. Cancellation is only allowed if at least one order in the
            transaction has an order status of <strong>pending</strong>.
          </p>
          <p>
            4. If canceled, all related orders and shipments will be marked as{" "}
            <strong>canceled</strong>.
          </p>
          <p>
            5. The product quantity in the order details will be restored to
            inventory.
          </p>
          <p>
            6. A notification will be sent to all stores involved in the order.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelPolicy;
