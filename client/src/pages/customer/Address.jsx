import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import AddressLoading from "@/components/loading/AddressLoading";
import AddAddress from "@/components/customer/address/AddAddress";
import AddressPreview from "@/components/customer/address/AddressPreview";

const Address = () => {
  const { getAddress, address } = useUserStore();

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  if (!address) return <AddressLoading />;

  return (
    <div className="space-y-4">
      <AddAddress />
      <AddressPreview address={address} />
    </div>
  );
};

export default Address;
