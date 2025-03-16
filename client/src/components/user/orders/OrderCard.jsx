/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { ShoppingBag } from "lucide-react";
import CancelUserOrder from "./CancelUserOrder";
import { formatToRupiah, cn } from "@/lib/utils";
import ConfirmUserOrder from "./ConfirmUserOrder";
import { Link, useLocation } from "react-router-dom";
import CancelPolicy from "../transactions/CancelPolicy";
import { CircleAlert } from "lucide-react";
import { useCountdown } from "@/hooks/useCountDown";

export default function OrderCard({ order }) {
  const location = useLocation();
  const autoCancelation = new Date(order.createdAt);
  autoCancelation.setDate(autoCancelation.getDate() + 1);
  const formattedCountdown = useCountdown(autoCancelation);

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
              ? "bg-yellow-400 text-black"
              : order.orderStatus === "pending"
              ? "bg-orange-500 text-white"
              : order.orderStatus === "process"
              ? "bg-blue-500 text-white"
              : order.orderStatus === "success"
              ? "bg-green-500 text-white"
              : order.orderStatus === "canceled"
              ? "bg-gray-400 text-white opacity-70"
              : "bg-red-500 text-white",
            "text-xs h-6 w-20 rounded-md flex items-center justify-center font-medium"
          )}
        >
          {order.orderStatus}
        </span>
        {order.orderStatus === "pending" && (
          <div className="flex items-center gap-2 text-xs md:text-sm text-red-500">
            <CircleAlert />
            <span>Auto Cancelation in :{formattedCountdown}</span>
          </div>
        )}
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
        {order.orderStatus === "process" &&
          order.shipment.shipmentStatus === "delivered" && (
            <ConfirmUserOrder orderId={order.id} />
          )}

        {order.orderStatus === "pending" && (
          <CancelUserOrder orderId={order.id} />
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

// {order.products.map((product) => (
//   <div className="flex items-center gap-2 mb-1" key={product.id}>
//     - <h5>{product.name}</h5>
//     <div className="text-sm md:text-md">
//       <span>
//         {product.quantity}product x {formatToRupiah(product.price)}
//       </span>
//     </div>
//   </div>
// ))}
