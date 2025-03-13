import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Data contoh untuk grafik harian dan bulanan
const dailyData = [
  { name: "Mon", revenue: 5000, orders: 200 },
  { name: "Tue", revenue: 7000, orders: 250 },
  { name: "Wed", revenue: 4000, orders: 150 },
  { name: "Thu", revenue: 8000, orders: 300 },
  { name: "Fri", revenue: 6000, orders: 220 },
  { name: "Sat", revenue: 9000, orders: 350 },
  { name: "Sun", revenue: 6500, orders: 270 },
];

const monthlyData = [
  { name: "Jan", revenue: 150000, orders: 3200 },
  { name: "Feb", revenue: 140000, orders: 3100 },
  { name: "Mar", revenue: 170000, orders: 4000 },
  { name: "Apr", revenue: 160000, orders: 3500 },
  { name: "May", revenue: 180000, orders: 4200 },
  { name: "Jun", revenue: 190000, orders: 4500 },
];

const StatisticChart = () => {
  const [viewMode, setViewMode] = useState("daily");

  return (
    <Card className="md:p-4 p-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Revenue & Orders</h3>
        <Button
          size="sm"
          onClick={() =>
            setViewMode(viewMode === "daily" ? "monthly" : "daily")
          }
        >
          {viewMode === "daily" ? "View Monthly" : "View Daily"}
        </Button>
      </div>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={viewMode === "daily" ? dailyData : monthlyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#4F46E5" name="Revenue" />
            <Bar dataKey="orders" fill="#16A34A" name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StatisticChart;
