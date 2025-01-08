import { Button } from "@/components/ui/Button";
import { SlidersHorizontal, SortAsc } from "lucide-react";
import { DrawerContainer } from "../components/drawer/DrawerContainer";

const sortValue = [
  {
    id: "price",
    name: "price",
    value: "asc",
    label: "minimum price",
  },
  {
    id: "price",
    name: "price",
    value: "desc",
    label: "maximum price",
  },
  {
    id: "price",
    name: "price",
    value: "asc",
    label: "minimum price",
  },
];

const FilterBoxMobile = ({ formData }) => {
  return (
    <div className="md:hidden block">
      <div className="flex justify-end py-6">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <SlidersHorizontal />
          </Button>
          <DrawerContainer title={<SortAsc />}>
            <div className="space-y-6 p-4">
              <div className="flex items-center justify-between">
                <label htmlFor="minPrice">Minimum price</label>
                <input
                  id="minPrice"
                  className="rounded-full w-6 h-6"
                  type="radio"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="minPrice">Minimum price</label>
                <input
                  id="minPrice"
                  className="rounded-full w-6 h-6"
                  checked={false}
                  type="radio"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="minPrice">Minimum price</label>
                <input
                  id="minPrice"
                  className="rounded-full w-6 h-6"
                  checked={false}
                  type="radio"
                />
              </div>
            </div>
          </DrawerContainer>
        </div>
      </div>
    </div>
  );
};

export default FilterBoxMobile;
