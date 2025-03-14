import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CancelOrder } from "./CancelOrder";
import toast from "react-hot-toast";

const OrderActions = ({ order }) => {
  const handleCancelOrder = () => {
    toast.success("Order is cancelled");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis size={20} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 space-y-2">
        <Button>Process</Button>
        <CancelOrder onClick={handleCancelOrder} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActions;
