import { Button } from "@/components/ui/Button";
import { SlidersHorizontal, SortAsc } from "lucide-react";
import { DrawerContainer } from "../components/drawer/DrawerContainer";

const sortValue = [
  {
    id: "minPrice",
    name: "price",
    value: "price:asc",
    label: "minimum price",
  },
  {
    id: "maxPrice",
    name: "price",
    value: "price:desc",
    label: "maximum price",
  },
  {
    id: "a-z",
    name: "alphabet",
    value: "alphabet:asc",
    label: "From A to Z",
  },
  {
    id: "z-a",
    name: "alphabet",
    value: "alphabet:desc",
    label: "From Z to A",
  },
];

const FilterBoxMobile = ({ formData }) => {
  return (
    <div className="flex justify-end py-2">
      <div className="flex gap-2">
        <Button variant="outline" size="icon">
          <SlidersHorizontal />
        </Button>
        <DrawerContainer title={<SortAsc />}>
          <div className="space-y-6 p-4">
            <div>
              <h4>Sort By</h4>
            </div>
            {sortValue.map((item) => (
              <div className="flex justify-between" key={item.id}>
                <label htmlFor="minPrice">{item.label}</label>
                <input
                  id={item.label}
                  name={item.name}
                  value={item.value}
                  className="rounded-full w-6 h-6"
                  type="radio"
                />
              </div>
            ))}
          </div>
        </DrawerContainer>
      </div>
    </div>
  );
};

export default FilterBoxMobile;
