/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";

const SearchInput = ({
  searchForm,
  handleBlur,
  searchRef,
  handleSearch,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        name="search"
        ref={searchRef}
        onBlur={handleBlur}
        onFocus={handleSearch}
        placeholder="Search a product.."
        onChange={searchForm?.handleChange}
        value={searchForm?.values?.search}
        className="text-sm md:text-md w-full border-muted-foreground/20"
      />
    </form>
  );
};

export default SearchInput;
