import { useEffect } from "react";
import { formatToRupiah } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const TransactionDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactionId } = useParams();
  const { getTransactionDetail, transaction } = useUserStore();

  useEffect(() => {
    if (transactionId) {
      getTransactionDetail(transactionId);
    }
  }, [getTransactionDetail, transactionId]);

  useEffect(() => {
    if (location.state?.background) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DialogContent className="h-96 max-w-md px-0 py-2 rounded-lg">
        <DialogTitle className="px-4 pb-2 border-b">
          <h3>Transaction Detail</h3>
        </DialogTitle>

        {!transaction ? null : (
          <ScrollArea className="flex-1 overflow-y-auto bg-muted mb-4">
            <div className="mb-2 py-2 px-4 bg-background">
              <h4>Description Product</h4>
              {transaction?.orders.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <h5>{item.store}</h5>
                    <div>{item.orderNumber}</div>
                  </div>
                  <div className="text-xs md:text-sm">
                    {item.details.map((detail) => (
                      <div key={detail.id}>
                        <div> {detail.name}</div>
                        <div className="flex items-center justify-between">
                          <span>
                            {formatToRupiah(detail.price)}x{detail.quantity}
                          </span>
                          <span>{formatToRupiah(detail.totalPrice)}</span>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between mb-2">
                      <span>shipment cost</span>
                      <span>{formatToRupiah(item.shipmentCost)}</span>
                    </div>
                    <div className="pb-2 border-b">
                      <h5>shipment address</h5>
                      <span>{item.shipmentAddress}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-2 py-2 px-4 bg-background text-xs space-y-2">
              <h4>Payment Detail</h4>
              <div className="flex items-center justify-between ">
                <p className="text-muted-foreground">Subtotal Product Price</p>
                <span className="font-medium">
                  {formatToRupiah(transaction.totalAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Total Shipment Cost</p>
                <span className="font-medium">
                  {formatToRupiah(transaction.totalShipmentCost)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Total Payment</p>
                <span className="font-medium">
                  {formatToRupiah(transaction.amountToPay)}
                </span>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetail;
