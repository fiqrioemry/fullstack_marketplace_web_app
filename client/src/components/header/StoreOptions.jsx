import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Store } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";

const StoreOptions = () => {
  const { user } = useAuthStore();
  const isHaveStore = user && user.role === "seller";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isHaveStore ? (
          <Avatar user={user.store} />
        ) : (
          <Store className=" w-5 h-5" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {isHaveStore ? (
          <div>
            <DropdownMenuLabel className="text-center">
              {user.store.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/store" className="btn-nav">
              Store dashboard <Store className=" w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div>
            <DropdownMenuLabel className="text-center">
              You Dont Have Store
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="open-store" className="btn btn-primary w-full">
              Open store
            </Link>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StoreOptions;
