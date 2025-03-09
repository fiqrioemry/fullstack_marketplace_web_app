import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import AddressLoading from "../loading/AddressLoading";
import AddressCard from "../card/AddressCard";

const AddressSelection = () => {
  const { address, getAddress } = useUserStore();

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  console.log(address);
  if (!address) return <AddressLoading />;
  return (
    <div className="md:col-span-2">
      {address
        .filter((add) => add.isMain === true)
        .map((item) => (
          <AddressCard address={item} key={item.id} />
        ))}
    </div>
  );
};

export default AddressSelection;
