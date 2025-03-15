/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import CancelPolicy from "./CancelPolicy";
import { CircleAlert } from "lucide-react";
import CancelTransaction from "./CancelTransaction";
import { useCountdown } from "@/hooks/useCountDown";
import { Link, useLocation } from "react-router-dom";

const TransactionCard = ({ transaction }) => {
  const location = useLocation();
  const isPaid = transaction.paymentStatus === "paid";
  const isPending = transaction.paymentStatus === "pending";

  const createdAt = new Date(transaction.createdAt);
  const timeDiff = (new Date() - createdAt) / (1000 * 60 * 60);
  const withinTimeLimit = isPaid ? timeDiff <= 2 : true;

  const hasPendingOrder = transaction.order.some(
    (order) => order.orderStatus === "pending"
  );
  const isCancelable =
    (isPending || (isPaid && withinTimeLimit)) && hasPendingOrder;
  const paymentDue = new Date(transaction.paymentDue);
  const formattedCountdown = useCountdown(paymentDue);

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="space-y-1">
        <div className="flex justify-between items-center gap-2">
          <span
            className={cn(
              isPending ? "bg-red-500" : "bg-blue-500",
              "text-xs h-5 w-14 rounded-md flex items-center justify-center text-white"
            )}
          >
            {transaction.paymentStatus}
          </span>

          {isPending && (
            <div className="flex items-center gap-2 text-xs md:text-sm text-red-500">
              <CircleAlert /> <span>Expired in {formattedCountdown}</span>
            </div>
          )}
        </div>
        <div className="text-xs md:text-sm">
          Total Order : <span>{transaction.order.length}</span>
        </div>
        {transaction.order.map((item) => (
          <div className="flex items-center gap-2" key={item.id}>
            <h5 key={item.id}>{item.orderNumber}</h5>
          </div>
        ))}
        <div>
          <p className="text-sm text-gray-400">
            Transaction Date :{format(new Date(transaction.createdAt), "PPP")}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Link
          to={`/user/transactions/${transaction.id}`}
          state={{ background: location }}
          className="btn btn-primary rounded-md px-4 h-8 text-xs md:text-sm"
        >
          See Detail
        </Link>
        {isPending && (
          <Link
            to={transaction.paymentLink}
            className="btn btn-primary rounded-md px-4 h-8 text-xs md:text-sm"
          >
            Payment Link
          </Link>
        )}
        {isCancelable && <CancelTransaction transactionId={transaction.id} />}
        <CancelPolicy />
      </div>
    </div>
  );
};

export default TransactionCard;
