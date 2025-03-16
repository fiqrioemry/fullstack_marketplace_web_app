/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { ShoppingBag } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { formatToRupiah, cn } from "@/lib/utils";
import CancelUserOrder from "./CancelUserOrder";
import ConfirmUserOrder from "./ConfirmUserOrder";
import { Link, useLocation } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountDown";
import CancelPolicy from "../transactions/CancelPolicy";

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
export default OrdersPreview;

const NoOrderToShow = () => {
  return (
    <div className="aspect-video border container mx-auto flex items-center justify-center">
      <h3>No Order Results</h3>
    </div>
  );
};

const OrderCard = ({ order }) => {
  const location = useLocation();

  const autoCancelation = new Date(order.createdAt);
  autoCancelation.setDate(autoCancelation.getDate() + 1);
  const formattedCountdown = useCountdown(autoCancelation);

  const isPending = order.orderStatus === "pending";
  const isProcess = order.orderStatus === "process";
  const isSuccess = order.orderStatus === "success";
  const isWaiting = order.orderStatus === "waiting payment";
  const isDelivered = order.shipment.shipmentStatus === "delivered";

  return (
    <div className="border rounded-lg p-4 mb-4">
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
        {isPending && (
          <div className="flex items-center gap-2 text-xs md:text-sm text-red-500">
            <CircleAlert />
            <span>Auto Cancelation in :{formattedCountdown}</span>
          </div>
        )}
      </div>

      <OrderDescription order={order} />

      <div className="flex items-center justify-end gap-2">
        {isSuccess && isDelivered && <ConfirmUserOrder orderId={order.id} />}

        {isPending && <CancelUserOrder orderId={order.id} />}

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
};

const OrderDescription = ({ order }) => {
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
  </div>;
};
