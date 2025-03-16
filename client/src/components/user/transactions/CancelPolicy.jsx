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
            1. Transactions can only be canceled if the order status is still{" "}
            <strong>pending</strong>.
          </p>
          <p>
            2. If the transaction status is <strong>paid</strong>, users can
            cancel individual orders through the respective order page.
          </p>
          <p>
            3. Orders can only be canceled if they are still in{" "}
            <strong>pending</strong> status.
          </p>
          <p>
            4. Orders that have already been processed by the seller cannot be
            canceled.
          </p>
          <p>
            5. Orders will be automatically canceled by the system if the seller
            does not process them within <strong>24 hours</strong>.
          </p>
          <p>
            6. Refunds from canceled orders will be credited as{" "}
            <strong>store balance</strong>, which can be viewed in the
            user&lsquo;s profile and used for future purchases within the
            marketplace.
          </p>
          <p>
            7. A notification will be sent whenever an order is canceled,
            whether by the system or by the seller.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelPolicy;
