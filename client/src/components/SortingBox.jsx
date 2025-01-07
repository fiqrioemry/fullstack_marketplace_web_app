import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SortingBox = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p>Menampilkan hasil pencarian untuk : Laptop Lenovo M4</p>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="minimum">Minimum Price</SelectItem>
              <SelectItem value="maximum">Maximum Price</SelectItem>
              <SelectItem value="asc">From A to Z</SelectItem>
              <SelectItem value="desc">From Z to A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortingBox;
