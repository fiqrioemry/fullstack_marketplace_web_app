/* eslint-disable react/prop-types */
import { format } from "date-fns";
import CancelPolicy from "./CancelPolicy";
import { formatToRupiah, cn } from "@/lib/utils";
import CancelTransaction from "./CancelTransaction";
import { useCountdown } from "@/hooks/useCountDown";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, CircleAlert } from "lucide-react";

const TransactionsPreview = ({ transactions }) => {
  if (transactions.length === 0) return <NoTransactionsToShow />;

  return (
    <>
      {transactions.map((transaction) => (
        <TransactionCard transaction={transaction} key={transaction.id} />
      ))}
    </>
  );
};

export default TransactionsPreview;

const NoTransactionsToShow = () => {
  return (
    <div className="h-screen container mx-auto py-3 md:py-6 px-2 flex items-center justify-center">
      <h3>No Transactions Results</h3>
    </div>
  );
};

const TransactionCard = ({ transaction }) => {
  const location = useLocation();

  const paymentDue = new Date(transaction.paymentDue);
  const formattedCountdown = useCountdown(paymentDue);

  const isPaid = transaction.paymentStatus === "paid";
  const isExpired = transaction.paymentStatus === "expired";
  const isPending = transaction.paymentStatus === "pending";
  const isCanceled = transaction.paymentStatus === "canceled";

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <ShoppingBag size={14} />
              {format(new Date(transaction.createdAt), "PPP")}
            </div>

            <span
              className={cn(
                isExpired
                  ? "bg-gray-500"
                  : isPaid
                  ? "bg-green-500"
                  : isPending
                  ? "bg-yellow-400 text-black"
                  : isCanceled
                  ? "bg-red-500"
                  : "bg-gray-300 text-black",
                "text-xs h-6 w-20 rounded-md flex items-center justify-center text-background font-medium"
              )}
            >
              {transaction.paymentStatus}
            </span>
          </div>

          {isPending && (
            <div className="flex items-center gap-2 text-xs md:text-sm text-red-500">
              <CircleAlert /> <span>Expired in {formattedCountdown}</span>
            </div>
          )}
        </div>

        {transaction.order.map((item) => (
          <div className="flex items-center gap-2" key={item.id}>
            <h5 key={item.id}>{item.orderNumber}</h5>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 text-sm capitalize">
        <div className="w-40"> Total Order</div>
        <span>{transaction.order.length}</span>
      </div>

      <div className="flex items-center gap-4 text-sm capitalize">
        <div className="w-40">Total payment billing</div>
        <span>{formatToRupiah(transaction.amountToPay)}</span>
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
        {isPending && <CancelTransaction transactionId={transaction.id} />}
        <CancelPolicy />
      </div>
    </div>
  );
};
