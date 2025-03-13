/* eslint-disable react/prop-types */
import { Card } from "@/components/ui/card";

const HeaderCard = ({ title, value, icon }) => {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </Card>
  );
};

export default HeaderCard;
