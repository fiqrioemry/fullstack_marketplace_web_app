import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StoreCard = () => {
  return (
    <Card className="grid grid-cols-1 md:grid-cols-2 py-8 space-y-8 ">
      <div className="flex px-4">
        <div className="w-60 flex justify-center">
          <div className="w-32 h-32 border border-foreground rounded-full">
            <img />
          </div>
        </div>
        <div className="space-y-4">
          <h4>Toko Serba Murah</h4>
          <span>Terakhir online : 1 jam lalu</span>
          <div className="flex items-center space-x-2  ">
            <Button>Chat Penjual</Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-x-2 px-4 md:px-8 md:text-md text-sm">
        <div className="text-center p-3">
          <h4>4.8</h4>
          <div>Rating & Reviews</div>
        </div>
        <div className="border border-foreground h-full"></div>
        <div className="text-center  p-3">
          <h4>Max 2 Hours</h4>
          <div>Order Process</div>
        </div>
        <div className="border border-foreground h-full"></div>
        <div className="text-center p-3">
          <h4>Open 24 Hour</h4>
          <div>Operational Hours</div>
        </div>
      </div>
    </Card>
  );
};

export default StoreCard;
