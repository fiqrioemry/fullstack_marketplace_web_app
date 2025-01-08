import { Button } from "@/components/ui/Button";
import { SlidersHorizontal, SortAsc } from "lucide-react";
import { DrawerContainer } from "../components/drawer/DrawerContainer";

const FilterBoxMobile = () => {
  return (
    <div className="md:hidden block">
      <div className="flex justify-end py-6">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <SlidersHorizontal />
          </Button>
          <DrawerContainer title={<SortAsc />}>
            <div className="flex items-center justify-center h-[250px]">
              <h1>area filter</h1>
            </div>
          </DrawerContainer>
        </div>
      </div>
    </div>
  );
};

export default FilterBoxMobile;
