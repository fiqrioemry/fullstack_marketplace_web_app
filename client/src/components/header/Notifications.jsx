import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { BellRing } from "lucide-react";
import UserNotifications from "./UserNotifcations";
import StoreNotifcations from "./StoreNotifcations";

const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BellRing className="w-5 h-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 py-2 p-0">
        <h4 className="pb-2 border-b">Notifications</h4>
        <UserNotifications />
        <StoreNotifcations />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
