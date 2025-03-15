/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { formatToRupiah, cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import CancelOrder from "@/components/dashboard/orders/CancelOrder";
import ProceedOrder from "@/components/dashboard/orders/ProceedOrder";

export default function OrderCard({ order }) {
  const location = useLocation();
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center gap-4">
        <div className="text-sm">
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
        <span className="text-sm font-medium text-muted-foreground">
          {order.orderNumber}
        </span>
      </div>
      <div>
        <h4>{order.store}</h4>
        {order.products.map((product) => (
          <div key={product.id}>
            <h5>{product.name}</h5>
            <div>
              {product.quantity} x {formatToRupiah(product.price)}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-2">
        {order.orderStatus === "pending" && <ProceedOrder orderId={order.id} />}

        {order.orderStatus === "pending" && <CancelOrder orderId={order.id} />}

        <Link
          to={`/user/orders/${order.id}`}
          state={{ background: location }}
          className="btn btn-primary rounded-md px-4 h-8 text-xs md:text-sm"
        >
          See detail
        </Link>
      </div>
    </div>
  );
}
