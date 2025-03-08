import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { BellRing } from "lucide-react";

const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BellRing />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-56 w-56 p-2">
        <div className="h-full flex items-center justify-center">
          <h4>This will display notifications</h4>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
