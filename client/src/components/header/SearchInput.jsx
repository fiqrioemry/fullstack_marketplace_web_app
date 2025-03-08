import { cn } from "@/lib/utils";
import SearchResult from "./SearchResult";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import useSearchProducts from "@/hooks/useSearchProducts";
import { useProductStore } from "@/store/useProductStore";

const SearchInput = () => {
  const navigate = useNavigate();

  const { searchProducts, results, searching } = useProductStore();

  const { searchForm, searchRef, handleSearch } =
    useSearchProducts(searchProducts);

  const handleNavigate = (user) => {
    searchForm.resetForm();
    navigate(`/${user.username}`);
  };

  return (
    <div className="flex-1 max-w-md md:max-w-xl w-full">
      <div ref={searchRef} className="w-full">
        <Input
          name="username"
          onFocus={handleSearch}
          placeholder="Search a product ..."
          onChange={searchForm?.handleChange}
          value={searchForm?.values?.search}
          className="text-sm md:text-md w-full border-muted-foreground"
        />
      </div>
      {searchForm?.values?.search?.length > 0 && (
        <SearchResult
          results={results}
          searching={searching}
          onClick={handleNavigate}
        />
      )}
    </div>
  );
};

export default SearchInput;
