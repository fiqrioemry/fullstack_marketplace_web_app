import { useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import PageLoading from "@/components/loading/PageLoading";

const AdminUsers = () => {
  const { getAllUsers, users } = useAdminStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (!users) return <PageLoading />;

  return (
    <div className="h-screen flex items-center justify-center">
      <h2>ADMIN USERS OVERVIEW</h2>
    </div>
  );
};

export default AdminUsers;
