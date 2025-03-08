import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import AddressLoading from "@/components/loading/AddressLoading";
import AddressDisplay from "@/components/user/AddressDisplay";

const Address = () => {
  const { getAddress, address } = useUserStore();

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  if (!address) return <AddressLoading />;

  return <AddressDisplay />;
};

export default Address;
