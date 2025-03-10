import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { BellRing, Clock, Truck, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BellRing className="w-5 h-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 py-2 p-0">
        <div className="flex justify-between items-center border-b p-2">
          <h3>Notifications</h3>
        </div>

        <div className="p-2">
          <div className="flex justify-between text-xs mt-3">
            <Link className="flex flex-col items-center  btn-accent">
              <Clock className="w-5 h-5" />
              <span className="mt-1">Pending</span>
            </Link>
            <Link className="flex flex-col items-center btn-accent">
              <CheckCircle className="w-5 h-5 " />
              <span className="mt-1">Process</span>
            </Link>
            <Link className="flex flex-col items-center btn-accent">
              <Truck className="w-5 h-5 " />
              <span className="mt-1">Shipped</span>
            </Link>
            <Link className="flex flex-col items-center btn-accent">
              <CheckCircle className="w-5 h-5" />
              <span className="mt-1">Delivered</span>
            </Link>
          </div>

          <Link className="btn btn-primary rounded-md mt-4">Lihat Semua</Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
