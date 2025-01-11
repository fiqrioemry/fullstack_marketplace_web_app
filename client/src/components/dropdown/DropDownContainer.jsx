import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// eslint-disable-next-line react/prop-types
const DropDownContainer = ({ children, trigger }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">{trigger}</div>
        </DropdownMenuTrigger>
        {children}
      </DropdownMenu>
    </div>
  );
};

export default DropDownContainer;
