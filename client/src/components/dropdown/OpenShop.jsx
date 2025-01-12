import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OpenShop = () => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Store />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          You Dont Have Shop
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button onClick={() => navigate("/open-shop")} className="w-full">
            Open Shop
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OpenShop;
