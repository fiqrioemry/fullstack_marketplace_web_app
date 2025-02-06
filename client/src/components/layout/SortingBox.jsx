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

const SortingBox = ({ searchForm }) => {
  const handleChange = (value) => {
    const [sortBy, orderBy] = value.split(":");
    searchForm.setValues({
      ...searchForm.values,
      sortBy: sortBy,
      orderBy: orderBy,
    });
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full md:w-1/3">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Parameter</SelectLabel>
          <SelectItem value="price:asc">Minimum Price</SelectItem>
          <SelectItem value="price:desc">Maximum Price</SelectItem>
          <SelectItem value="name:asc">From A to Z</SelectItem>
          <SelectItem value="name:desc">From Z to A</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortingBox;
