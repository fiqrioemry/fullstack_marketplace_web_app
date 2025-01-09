import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
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
    <div className="hidden md:flex items-center justify-between py-4">
      <div>
        <p>Menampilkan hasil pencarian untuk : Laptop Lenovo M4</p>
      </div>
      <div>
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
