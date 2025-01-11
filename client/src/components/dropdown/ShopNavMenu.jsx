import {
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ShopNavMenu = () => {
  const navigate = useNavigate();
  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel className="text-center">
        You Dont Have Store
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div className="p-2">
        <Button onClick={() => navigate("/open-shop")} className="w-full">
          Open Store
        </Button>
      </div>
    </DropdownMenuContent>
  );
};

export default ShopNavMenu;
