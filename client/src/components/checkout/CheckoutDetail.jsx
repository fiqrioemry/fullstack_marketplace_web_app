import { useFormSchema } from "@/hooks/useFormSchema";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { checkoutState } from "../../config";
import { AddressSelection } from "./AddressSelection";

const CheckoutDetail = () => {
  const { address } = useUserStore();
  const { cart, checkoutItem } = useCartStore();
  const mainAddress = address.find((add) => add.isMain);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="p-4 border rounded-lg bg-background shadow-lg">
          <div className="flex items-center space-x-2 text-sm">
            <h5 className="capitalize">{mainAddress.name}</h5>
            {mainAddress.isMain && (
              <span className="bg-primary h-5 w-10 text-[10px] flex items-center justify-center text-white rounded-md">
                main
              </span>
            )}
          </div>
          <div className="text-sm">{mainAddress.phone}</div>
          <div className="text-sm mb-4">
            {mainAddress.address} {mainAddress.province} {mainAddress.city}
            {mainAddress.zipcode}
          </div>
          <AddressSelection />
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default CheckoutDetail;
