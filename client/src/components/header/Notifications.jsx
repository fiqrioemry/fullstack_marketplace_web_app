import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { BellRing } from "lucide-react";
import UserNotifications from "./UserNotifcations";
import StoreNotifcations from "./StoreNotifcations";
import { useAuthStore } from "@/store/useAuthStore";

const Notifications = () => {
  const { user } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BellRing className="w-5 h-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 py-2 p-0">
        <h4 className="pb-2 px-2 border-b">Notifications</h4>
        <UserNotifications />
        {user.role === "seller" && <StoreNotifcations />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
