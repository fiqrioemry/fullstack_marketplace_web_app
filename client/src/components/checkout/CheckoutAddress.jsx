/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { AddressSelection } from "./AddressSelection";
import AddressCardLoading from "@/components/loading/AddressCardLoading";

const CheckoutAddress = ({ transactionForm }) => {
  const { address } = useUserStore();
  const selectedAddress = transactionForm.values.address;
  const mainAddress = address.find((add) => add.isMain) || address[0];

  useEffect(() => {
    transactionForm.setFieldValue("address", mainAddress);
  }, []);

  if (!transactionForm.values.address) return <AddressCardLoading />;

  return (
    <div className="p-4 border rounded-lg bg-background mb-4">
      <h5 className="capitalize mb-2">{selectedAddress.name}</h5>

      <div className="text-sm mb-2">
        <span className="capitalize font-medium">phone : </span>{" "}
        {selectedAddress.phone}
      </div>
      <div className="text-sm mb-4">
        {selectedAddress.address} {selectedAddress.province}
        {selectedAddress.city}
        {selectedAddress.zipcode}
      </div>
      <AddressSelection transactionForm={transactionForm} />
    </div>
  );
};

export default CheckoutAddress;
