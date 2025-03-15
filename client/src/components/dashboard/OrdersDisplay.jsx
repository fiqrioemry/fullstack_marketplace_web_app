import { format } from "date-fns";
import CancelOrder from "./orders/CancelOrder";
import { formatToRupiah, cn } from "@/lib/utils";
import ProceedOrder from "./orders/ProceedOrder";
import { useShopStore } from "@/store/useShopStore";
import { Link, useLocation } from "react-router-dom";

export default function OrdersDisplay() {
  const location = useLocation();
  const { orders } = useShopStore();

  return (
    <div className="h-full container mx-auto py-3 md:py-6 px-2">
      <div className="h-full py-4 border-t border-b">
        {orders.map((order) => (
          <div className="border rounded-lg p-4 mb-4" key={order.id}>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-6">
                  <p className="font-semibold">
                    Order No. : {order.orderNumber}
                  </p>
                  <span
                    className={cn(
                      order.orderStatus === "pending"
                        ? "bg-red-500"
                        : "bg-green-500",
                      "text-xs h-6 w-14 rounded-md flex items-center justify-center text-white"
                    )}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {formatToRupiah(order.totalOrderAmount)}
                </p>
                <p className="text-xs text-gray-400">
                  {order.orderDetail.length} Product
                </p>
                <p className="text-xs text-gray-400">
                  {format(new Date(order.createdAt), "PPP")}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              {order.orderStatus === "pending" && (
                <ProceedOrder orderId={order.id} />
              )}

              {order.orderStatus === "pending" && (
                <CancelOrder orderId={order.id} />
              )}

              <Link
                to={`/store/orders/${order.id}`}
                state={{ background: location }}
                className="btn btn-primary rounded-md px-4 h-8 text-xs md:text-sm"
              >
                See detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
