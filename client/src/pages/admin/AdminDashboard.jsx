import { useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import PageLoading from "@/components/loading/PageLoading";

const AdminUsers = () => {
  const { getAdminDashboardSummary, statistic } = useAdminStore();

  console.log(statistic);

  useEffect(() => {
    getAdminDashboardSummary();
  }, [getAdminDashboardSummary]);

  if (!statistic) return <PageLoading />;

  return (
    <div className="h-screen flex items-center justify-center">
      <h2>DASHBOARD USERS OVERVIEW</h2>
    </div>
  );
};

export default AdminUsers;
