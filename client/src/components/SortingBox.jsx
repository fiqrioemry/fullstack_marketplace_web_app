/* eslint-disable react/prop-types */
import {
  Select,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

const SortingBox = ({ setSearchParams }) => {
  const handleChange = (value) => {
    const [sortBy, order] = value.split(":");
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev.entries()),
      sortBy,
      order,
    }));
  };

  return (
    <div className="flex md:flex-row flex-col justify-between">
      <div className="order-2 md:order-1 flex items-center justify-center md:text-md text-sm">
        <p>Menampilkan hasil pencarian untuk : Laptop Lenovo M4</p>
      </div>
      <div className="order-1 md:order-2 flex justify-end md:pb-0 pb-4">
        <Select onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Parameter</SelectLabel>
              <SelectItem value="price:asc">Minimum Price</SelectItem>
              <SelectItem value="price:desc">Maximum Price</SelectItem>
              <SelectItem value="alphabet:asc">From A to Z</SelectItem>
              <SelectItem value="alphabet:desc">From Z to A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortingBox;
