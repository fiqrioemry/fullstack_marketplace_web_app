import StatisticChart from "./statistic/StatisticChart";
import StatisticHeader from "./statistic/StatisticHeader";
import StatisticTable from "./statistic/StatisticTable";

const StatisticDisplay = () => {
  return (
    <div className="p-6 space-y-6">
      <StatisticHeader />
      <StatisticChart />
      <StatisticTable />
    </div>
  );
};

export default StatisticDisplay;
