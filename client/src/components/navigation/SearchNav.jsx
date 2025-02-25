import { useRef } from "react";
import { searchState } from "@/config";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useProductStore } from "@/store/useProductStore";
import useDebouncedSearch from "@/hooks/useDebounchSearch";
import SearchLoading from "@/components/loading/SearchLoading";

const SearchNav = () => {
  const navigate = useNavigate();
  const searchForm = useFormSchema(searchState);
  const { searchProducts, results, loading } = useProductStore();
  const inputRef = useRef(null);

  const handleSearchNavigation = (searchParams) => {
    searchForm.resetForm();
    navigate(`/search?search=${searchParams}`);
    inputRef.current?.blur();
  };

  useDebouncedSearch(searchForm.values.search, 300, searchProducts);

  return (
    <div className="search-margin">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchNavigation(searchForm.values.search);
        }}
      >
        <Input
          ref={inputRef}
          name="search"
          className="border-muted"
          placeholder="Search a product..."
          value={searchForm.values.search}
          onChange={searchForm.handleChange}
        />
      </form>

      {searchForm.values.search?.length > 0 && (
        <div className="search-input">
          {loading.search ? (
            <SearchLoading />
          ) : results?.length > 0 ? (
            <div className="flex flex-col">
              {results.map(({ id, name, slug }) => (
                <button
                  key={id}
                  className="py-2 px-4 flex items-start bg-background hover:bg-muted m-1 rounded-md transition-colors"
                  onClick={() => handleSearchNavigation(slug)}
                >
                  {name}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-2 px-4">No search result</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchNav;
