import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import Address from "@/components/dashboard/customer/Address";
import AddressLoading from "@/components/loading/AddressLoading";

const AddressLayout = () => {
  const { getAddress, loading } = useUserStore();

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  return (
    <div className="space-y-6 p-4">
      {loading ? <AddressLoading /> : <Address />}
    </div>
  );
};

export default AddressLayout;
