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
      <DialogContent className="h-96 max-w-lg py-4 px-0 rounded-xl shadow-lg">
        <DialogTitle className="border-b text-center pb-2 px-2">
          <h3>Transaction Detail</h3>
        </DialogTitle>

        {!transaction ? null : (
          <ScrollArea className="flex-1 overflow-y-auto  px-2">
            {/* order */}
            <div className="p-4 rounded-md border mb-2">
              <h4 className="mb-2">Order Detail</h4>
              {transaction?.orders.map((item) => (
                <div key={item.id} className="mb-4">
                  <div className="flex items-center border-t justify-between pt-2 mb-2">
                    <h5>{item.store}</h5>
                    <span className="text-xs text-gray-500">
                      {item.orderNumber}
                    </span>
                  </div>
                  <div className="text-xs space-y-2">
                    {item.details.map((detail) => (
                      <div key={detail.id} className="border-b pb-2">
                        <div>{detail.name}</div>
                        <div className="flex items-center justify-between text-gray-700">
                          <span>
                            {formatToRupiah(detail.price)} x {detail.quantity}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {formatToRupiah(detail.totalPrice)}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between">
                      <span>Shipment Cost</span>
                      <span>{formatToRupiah(item.shipmentCost)}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <p>Shipment Address</p>
                      <span className="text-xs text-gray-600">
                        {item.shipmentAddress}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment  */}
            <div className="p-4 rounded-md border mb-2">
              <h4>Payment Detail</h4>
              <div className="mt-2 border-t text-xs space-y-2">
                <div className="flex items-center justify-between pt-2">
                  <p>Subtotal Product Price</p>
                  <span>{formatToRupiah(transaction.totalAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p>Total Shipment Cost</p>
                  <span>{formatToRupiah(transaction.totalShipmentCost)}</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <h5>Total Payment</h5>
                  <span>{formatToRupiah(transaction.amountToPay)}</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetail;
