import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import AddressLoading from "../loading/AddressLoading";

const AddressSelection = () => {
  const { address, getAddress } = useUserStore();

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  console.log(address);
  if (!address) return <AddressLoading />;
  return (
    <div className="md:col-span-2 bg-background border rounded-lg p-4">
      CART HERE
    </div>
  );
};

export default AddressSelection;
