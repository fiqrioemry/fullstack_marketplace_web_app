/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";

const SearchInput = ({ searchForm, handleSearch }) => {
  return (
    <div className="w-full">
      <Input
        name="search"
        onFocus={handleSearch}
        value={searchForm?.values?.search}
        onChange={searchForm?.handleChange}
        placeholder="Enter product keywords..."
        className="text-sm md:text-md w-full border-muted-foreground"
      />
    </div>
  );
};

export default SearchInput;
