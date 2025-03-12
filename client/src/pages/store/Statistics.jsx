import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import StatisticDisplay from "@/components/dashboard/StatisticDisplay";
import StoreProfileLoading from "@/components/loading/StoreProfileLoading";

const Statistics = () => {
  const { getStoreStatisticSummary, statistic } = useShopStore();

  useEffect(() => {
    getStoreStatisticSummary();
  }, [getStoreStatisticSummary]);

  if (!statistic) return <StoreProfileLoading />;
  return <StatisticDisplay />;
};

export default Statistics;
