import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis size={20} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 space-y-2">
        <Button>Process</Button>
        <Button variant="delete">Cancel</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActions;
