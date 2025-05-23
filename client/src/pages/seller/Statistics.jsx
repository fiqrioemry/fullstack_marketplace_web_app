import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import StoreProfileLoading from "@/components/loading/StoreProfileLoading";
import StatisticChart from "@/components/seller/statistics/StatisticChart";
import StatisticTable from "@/components/seller/Statistics/StatisticTable";
import StatisticHeader from "@/components/seller/statistics/StatisticHeader";

const Statistics = () => {
  const { getStoreStatisticSummary, statistic } = useShopStore();

  useEffect(() => {
    getStoreStatisticSummary();
  }, [getStoreStatisticSummary]);

  if (!statistic) return <StoreProfileLoading />;

  return (
    <div className="space-y-4">
      <StatisticHeader />
      <StatisticChart />
      <StatisticTable />
    </div>
  );
};

export default Statistics;
