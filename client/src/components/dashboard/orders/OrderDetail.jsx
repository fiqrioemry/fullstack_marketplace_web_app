import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatToRupiah } from "../../../lib/utils";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getStoreOrderDetail, order } = useShopStore();
  console.log(order);
  useEffect(() => {
    if (orderId) {
      getStoreOrderDetail(orderId);
    }
  }, [getStoreOrderDetail, orderId]);

  useEffect(() => {
    if (location.state?.background) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DialogContent className="flex flex-col h-96 max-w-md px-0 py-2 rounded-lg">
        <DialogTitle className="px-4 pb-2 border-b">
          <h3>Order Detail</h3>
        </DialogTitle>

        {!order ? null : (
          <ScrollArea className="flex-1 overflow-y-auto bg-muted mb-4">
            <div className="mb-2 py-2 px-4 bg-background space-y-2">
              <h4>Order Information</h4>
              <div className="flex items-center justify-between text-muted-foreground text-xs">
                <p>Order Number</p>
                <p>{order?.orderNumber}</p>
              </div>
              <div className="flex items-center justify-between text-muted-foreground text-xs">
                <p>Order Date</p>
                <p>{order?.createdAt}</p>
              </div>
              <div className="flex items-center justify-between text-muted-foreground text-xs">
                <p>Order Status</p>
                <p>{order?.orderStatus}</p>
              </div>
            </div>
            <div className="mb-2 py-2 px-4 bg-background">
              <h4>Product Detail</h4>
              {order?.orderDetail.map((item) => (
                <div className="flex items-center gap-2 p-2" key={item.id}>
                  <img
                    src={item.product.gallery[0].image}
                    className="h-10 w-10 border object-cover"
                    alt={item.product.name}
                  />
                  <div className="flex-1">
                    <h5>{item.product.name}</h5>
                    <span className="text-xs md:text-sm">
                      {item.price} x {item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-2 py-2 px-4 bg-background text-xs text-muted-foreground space-y-2  capitalize">
              <h4 className="text-foreground">Shipment Detail</h4>
              <div className="flex gap-2">
                <p className="w-40">name</p>
                <span>: {order.address.name}</span>
              </div>
              <div className="flex gap-2">
                <p className="w-40">contact</p>
                <span>: {order.address.phone}</span>
              </div>
              <div className="flex gap-2 ">
                <p className="flex-shrink-0 w-40">address</p>
                <div className="flex-1 space-x-2">
                  : <span>{order.address.address}</span>
                  <span>{order.address.province}</span>
                  <span>{order.address.city}</span>
                  <span>{order.address.zipcode}</span>
                </div>
              </div>
            </div>
            <div className="mb-2 py-2 px-4 bg-background text-xs space-y-2">
              <h4>Payment Detail</h4>
              <div className="flex items-center justify-between ">
                <p className="text-muted-foreground">Subtotal Product Price</p>
                <span className="font-medium">
                  {formatToRupiah(order.totalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Total Shipment Cost</p>
                <span className="font-medium">
                  {formatToRupiah(order.shipmentCost)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Total Payment</p>
                <span className="font-medium">
                  {formatToRupiah(order.totalOrderAmount)}
                </span>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetail;
