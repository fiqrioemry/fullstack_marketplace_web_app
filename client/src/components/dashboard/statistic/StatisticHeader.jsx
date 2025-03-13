import HeaderCard from "./HeaderCard";
import { ShoppingCart, Package, DollarSign, Hourglass } from "lucide-react";

const StatisticHeader = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header dengan Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <HeaderCard
          title="Total Produk"
          value="1,245"
          icon={<Package className="w-6 h-6 text-blue-500" />}
        />
        <HeaderCard
          title="Total Order"
          value="3,987"
          icon={<ShoppingCart className="w-6 h-6 text-green-500" />}
        />
        <HeaderCard
          title="Total Revenue"
          value="$45,876"
          icon={<DollarSign className="w-6 h-6 text-yellow-500" />}
        />
        <HeaderCard
          title="Pending Order"
          value="78"
          icon={<Hourglass className="w-6 h-6 text-red-500" />}
        />
      </div>
    </div>
  );
};

export default StatisticHeader;
