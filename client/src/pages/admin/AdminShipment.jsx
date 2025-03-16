import { useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import PageLoading from "@/components/loading/PageLoading";

const AdminUsers = () => {
  const { getAllShipments, shipments } = useAdminStore();

  console.log(shipments);

  useEffect(() => {
    getAllShipments();
  }, [getAllShipments]);

  if (!shipments) return <PageLoading />;

  return (
    <div className="h-screen flex items-center justify-center">
      <h2>ADMIN USERS OVERVIEW</h2>
    </div>
  );
};

export default AdminUsers;
