/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { AddressSelection } from "./AddressSelection";
import AddressCardLoading from "@/components/loading/AddressCardLoading";

const CheckoutAddress = ({ checkoutForm }) => {
  const { address } = useUserStore();
  const selectedAddress = checkoutForm.values.address;
  const mainAddress = address.find((add) => add.isMain);

  useEffect(() => {
    checkoutForm.setFieldValue("address", mainAddress);
  }, []);

  if (!checkoutForm.values.address) return <AddressCardLoading />;

  return (
    <div className="p-4 border rounded-lg bg-background mb-4">
      <div className="flex items-center space-x-2 text-sm">
        <h5 className="capitalize">{selectedAddress.name}</h5>
      </div>
      <div className="text-sm">{selectedAddress.phone}</div>
      <div className="text-sm mb-4">
        {selectedAddress.address} {selectedAddress.province}
        {selectedAddress.city}
        {selectedAddress.zipcode}
      </div>
      <AddressSelection checkoutForm={checkoutForm} />
    </div>
  );
};

export default CheckoutAddress;
