import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Store } from "lucide-react";
import { Link } from "react-router-dom";

const StoreOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Store className=" w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          You Dont Have Store
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="open-store" className="btn btn-primary w-full">
          Open store
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StoreOptions;
