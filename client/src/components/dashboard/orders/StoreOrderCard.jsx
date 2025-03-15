/* eslint-disable react/prop-types */
import { format } from "date-fns";
import CancelOrder from "./CancelOrder";
import ProceedOrder from "./ProceedOrder";
import { ShoppingBag } from "lucide-react";
import { formatToRupiah, cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import CancelPolicy from "@/components/user/transactions/CancelPolicy";

export default function OrderCard({ order }) {
  const location = useLocation();

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <ShoppingBag size={14} />
          {format(new Date(order.createdAt), "PPP")}
        </div>
        <span
          className={cn(
            order.orderStatus === "waiting payment"
              ? "bg-yellow-500"
              : order.orderStatus === "pending"
              ? "bg-red-500"
              : order.orderStatus === "process"
              ? "bg-blue-500"
              : order.orderStatus === "success"
              ? "bg-green-500"
              : "bg-red-500",
            "text-xs h-6 w-14 rounded-md flex items-center justify-center text-white"
          )}
        >
          {order.orderStatus}
        </span>
      </div>
      <div>
        <h5>{order.store}</h5>
        <div className="flex items-center gap-4 text-sm capitalize">
          <div className="w-40">Total products</div>
          <span>{order.totalProducts} products</span>
        </div>
        <div className="flex items-center gap-4 text-sm capitalize">
          <div className="w-40"> Total price</div>
          <span>{formatToRupiah(order.totalPrice)}</span>
        </div>
        <div className="flex items-center gap-4 text-sm capitalize">
          <div className="w-40"> Order number</div>
          <span className="font-medium text-muted-foreground">
            {order.orderNumber}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        {order.orderStatus === "pending" && (
          <div className="flex items-center gap-2">
            <ProceedOrder orderId={order.id} />
            <CancelOrder orderId={order.id} />
          </div>
        )}

        <Link
          to={`/user/orders/${order.id}`}
          state={{ background: location }}
          className="btn btn-primary rounded-md px-4 h-8 text-xs md:text-sm"
        >
          See detail
        </Link>
        <CancelPolicy />
      </div>
    </div>
  );
}
