import { searchState } from "@/config";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useCallback, useEffect, useRef } from "react";
import { useProductStore } from "@/store/useProductStore";
import SearchLoading from "@/components/loading/SearchLoading";

const SearchNav = () => {
  const debounceRef = useRef(null);
  const searchForm = useFormSchema(searchState);
  const { searchProducts, results, loading } = useProductStore();

  const searchHandler = useCallback(() => {
    if (!searchForm.values.search.trim()) return;
    searchProducts(searchForm.values.search);
  }, [searchForm.values.search, searchProducts]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(searchHandler, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchForm.values.search, searchHandler]);

  return (
    <div className="search-margin">
      <Input
        name="search"
        className="border-muted"
        placeholder="Search a product..."
        value={searchForm.values.search}
        onChange={searchForm.handleChange}
      />

      {searchForm.values.search && searchForm.values.search.length > 0 && (
        <div className="search-input">
          {loading.search ? (
            <SearchLoading />
          ) : results && results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((result) => (
                <Link
                  to={`/search?search=${result.slug}`}
                  className="w-full btn-nav"
                  key={result.id}
                >
                  {result.name}
                </Link>
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
