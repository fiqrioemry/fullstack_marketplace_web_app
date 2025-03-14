import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useShopStore } from "@/store/useShopStore";
import { Card, CardContent } from "@/components/ui/card";

const StatisticChart = () => {
  const { statistic } = useShopStore();
  const [viewMode, setViewMode] = useState("order");

  const chartData = statistic.ordersByDay.map((order) => {
    const revenueData = statistic.revenueByDay.find(
      (rev) => rev.date === order.date
    );
    return {
      date: order.date,
      order_count: order.order_count,
      total_revenue: revenueData ? parseFloat(revenueData.total_revenue) : 0,
    };
  });

  return (
    <Card className="md:p-4 p-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Revenue & Orders</h3>
        <Button
          size="sm"
          onClick={() =>
            setViewMode(viewMode === "order" ? "revenue" : "order")
          }
        >
          {viewMode === "order" ? "View Revenue" : "View Orders"}
        </Button>
      </div>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" tickFormatter={(tick) => tick} />
            <YAxis />
            <Tooltip />
            <Legend />
            {viewMode === "order" ? (
              <Bar dataKey="order_count" fill="#4F46E5" name="Orders per Day" />
            ) : (
              <Bar
                dataKey="total_revenue"
                fill="#22C55E"
                name="Revenue per Day"
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StatisticChart;
