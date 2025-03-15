import { useEffect } from "react";
import { formatToRupiah } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const UserOrderDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = useParams();
  const { getUserOrderDetail, order } = useUserStore();

  useEffect(() => {
    if (orderId) {
      getUserOrderDetail(orderId);
    }
  }, [getUserOrderDetail, orderId]);

  useEffect(() => {
    if (location.state?.background) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DialogContent className="h-96 max-w-lg py-4 px-0 rounded-xl shadow-lg">
        <DialogTitle className="border-b text-center pb-2 px-2">
          <h3>Order Detail</h3>
        </DialogTitle>

        {!order ? null : (
          <ScrollArea className="flex-1 overflow-y-auto bg-muted mb-4">
            <div className="mb-2 py-2 px-4 bg-background space-y-2">
              <h4>Order Information</h4>
              <div className="flex items-center justify-between text-muted-foreground text-xs">
                <p>Order Number</p>
                <span>{order?.orderNumber}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground text-xs">
                <p>Order Date</p>
                <span>{order?.createdAt}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground text-xs">
                <p>Order Status</p>
                <span>{order?.orderStatus}</span>
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

export default UserOrderDetail;
