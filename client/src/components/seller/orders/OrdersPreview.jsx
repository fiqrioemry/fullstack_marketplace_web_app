/* eslint-disable react/prop-types */
import { format } from "date-fns";
import CancelOrder from "./CancelOrder";
import ProceedOrder from "./ProceedOrder";
import { ShoppingBag } from "lucide-react";
import { formatToRupiah, cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const OrdersPreview = ({ orders }) => {
  if (orders.length === 0) return <NoOrderToShow />;

  return (
    <>
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </>
  );
};

const NoOrderToShow = () => {
  return (
    <div className="aspect-video border container mx-auto flex items-center justify-center">
      <h3>No Order Results</h3>
    </div>
  );
};

const OrderCard = ({ order }) => {
  const location = useLocation();
  const isPending = order.orderStatus === "pending";
  const isProcess = order.orderStatus === "process";
  const isSuccess = order.orderStatus === "success";
  const isWaiting = order.orderStatus === "waiting payment";

  return (
    <div className="border bg-background rounded-lg p-4 mb-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <ShoppingBag size={14} />
          {format(new Date(order.createdAt), "PPP")}
        </div>
        <span
          className={cn(
            isWaiting
              ? "bg-yellow-400 text-black"
              : isPending
              ? "bg-orange-500 "
              : isProcess
              ? "bg-blue-500"
              : isSuccess
              ? "bg-green-500"
              : "bg-red-500 ",
            "text-xs h-6 w-20 text-white rounded-md flex items-center justify-center font-medium"
          )}
        >
          {order.orderStatus}
        </span>
      </div>
      <OrderDescription order={order} />
      <div className="flex items-center justify-end gap-2">
        {isPending && (
          <div className="flex items-center gap-2">
            <ProceedOrder orderId={order.id} />
            <CancelOrder orderId={order.id} />
          </div>
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
  );
};

const OrderDescription = ({ order }) => {
  return (
    <div>
      <div className="flex items-center gap-4 text-sm capitalize">
        <div className="w-40">Total products</div>
        <span>{order.totalProducts} products</span>
      </div>
      <div className="flex items-center gap-4 text-sm capitalize">
        <div className="w-40"> Total price</div>
        <span>{formatToRupiah(order.totalPrice)}</span>
      </div>
      <div className="flex items-center gap-4 text-sm capitalize">
        <div className="w-40">Order number</div>
        <span className="font-medium text-muted-foreground">
          {order.orderNumber}
        </span>
      </div>
    </div>
  );
};
export default OrdersPreview;
