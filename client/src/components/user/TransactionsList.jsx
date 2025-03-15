import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import CancelTransaction from "./transactions/CancelTransaction";
import CancelPolicy from "./transactions/CancelPolicy";

export default function TransactionList() {
  const location = useLocation();
  const { transactions } = useUserStore();

  return (
    <div className="h-full container mx-auto py-3 md:py-6 px-2">
      <div className="h-full py-4 border-t border-b">
        {transactions.map((trans) => {
          const isPending = trans.paymentStatus === "pending";
          const isPaid = trans.paymentStatus === "paid";

          // Cek apakah transaksi masih dalam 2 jam jika berstatus 'paid'
          const createdAt = new Date(trans.createdAt);
          const now = new Date();
          const timeDiff = (now - createdAt) / (1000 * 60 * 60); // Dalam jam
          const withinTimeLimit = isPaid ? timeDiff <= 2 : true;

          // Cek apakah ada order dengan status 'pending'
          const hasPendingOrder = trans.order.some(
            (order) => order.orderStatus === "pending"
          );

          // Hanya bisa dibatalkan jika memenuhi semua syarat
          const isCancelable =
            (isPending || (isPaid && withinTimeLimit)) && hasPendingOrder;

          return (
            <div className="border rounded-lg p-4 mb-4" key={trans.id}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      isPending ? "bg-red-500" : "bg-blue-500",
                      "text-xs h-5 w-14 rounded-md flex items-center justify-center text-white"
                    )}
                  >
                    {trans.paymentStatus}
                  </span>
                  {isPending && (
                    <div>
                      Complete payment before{" "}
                      {format(new Date(trans.paymentDue), "PPP")}
                    </div>
                  )}
                </div>
                <div className="text-xs md:text-sm">
                  Total Order : <span>{trans.order.length}</span>
                </div>
                {trans.order.map((item) => (
                  <div className="flex items-center gap-2" key={item.id}>
                    <h5 key={item.id}>{item.orderNumber}</h5>
                  </div>
                ))}
                <div>
                  <p className="text-xs text-gray-400">
                    Transaction Date :{" "}
                    {format(new Date(trans.createdAt), "PPP")}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                {isCancelable && <CancelTransaction transactionId={trans.id} />}
                <Link
                  to={`/user/transactions/${trans.id}`}
                  state={{ background: location }}
                  className="btn btn-primary rounded-md px-4 h-8 text-xs md:text-sm"
                >
                  See Detail
                </Link>
                {isPending && (
                  <Link
                    to={trans.paymentLink}
                    className="btn btn-primary rounded-md px-4 h-8 text-xs md:text-sm"
                  >
                    Payment Link
                  </Link>
                )}
                <CancelPolicy />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
