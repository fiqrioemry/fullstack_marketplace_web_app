import HeaderCard from "./HeaderCard";
import { useShopStore } from "@/store/useShopStore";
import { ShoppingCart, Package, DollarSign, Hourglass } from "lucide-react";
import { formatToRupiah } from "../../../lib/utils";

const StatisticHeader = () => {
  const { statistic } = useShopStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <HeaderCard
        title="Total Produk"
        value={statistic.totalProducts}
        icon={<Package className="w-6 h-6 text-blue-500" />}
      />
      <HeaderCard
        title="Total Order"
        value={statistic.totalOrders}
        icon={<ShoppingCart className="w-6 h-6 text-green-500" />}
      />
      <HeaderCard
        title="Total Revenue"
        value={formatToRupiah(statistic.totalRevenue)}
        icon={<DollarSign className="w-6 h-6 text-yellow-500" />}
      />
      <HeaderCard
        title="Pending Order"
        value={statistic.pendingOrders}
        icon={<Hourglass className="w-6 h-6 text-red-500" />}
      />
    </div>
  );
};

export default StatisticHeader;
