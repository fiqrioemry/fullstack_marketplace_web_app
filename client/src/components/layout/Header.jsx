import { cn } from "@/lib/utils";
import { searchState } from "@/config";
import Logo from "@/components/ui/Logo";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import SearchInput from "@/components/header/SearchInput";
import { useProductStore } from "@/store/useProductStore";
import useSearchProducts from "@/hooks/useSearchProducts";
import SearchResult from "@/components/header/SearchResult";
import NavigationMenu from "@/components/header/NavigationMenu";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { searchProducts, results, searching } = useProductStore();
  const { searchForm, searchRef, openSearch, handleSearch, handleBlur } =
    useSearchProducts(searchProducts, searchState);

  const handleSubmit = () => {
    navigate(`/products?search=${searchForm.values.search}`);
  };

  const searchActive = cn(
    openSearch ? "hidden md:block" : "block",
    "overflow-y-auto delay-50 duration-150 ease-in transition-all"
  );

  const inputActive = cn(
    openSearch ? "w-full md:w-96" : "w-96",
    "flex-1 relative duration-300 ease-in  transition-all"
  );

  const resultActive = cn(
    openSearch ? "max-h-96" : "max-h-0",
    "absolute top-11 right-0 left-0 bg-background rounded-lg shadow-lg  overflow-hidden z-30 delay-150 duration-150 ease-in transition-all"
  );

  return (
    <div className="h-14">
      <header className="fixed w-full z-50 bg-background p-2 border-b">
        <div className="flex items-center justify-between container mx-auto gap-4">
          {/* Website Logo */}
          <div className="hidden md:flex px-2">
            <Logo />
          </div>

          {/* search products*/}
          <div ref={searchRef} className={inputActive}>
            <SearchInput
              searchRef={searchRef}
              handleBlur={handleBlur}
              searchForm={searchForm}
              handleSubmit={handleSubmit}
              handleSearch={handleSearch}
            />

            <div className={resultActive}>
              <SearchResult
                results={results}
                searching={searching}
                searchForm={searchForm}
              />
            </div>
          </div>

          {/* Navigation menu */}
          <div className={searchActive}>
            <NavigationMenu user={user} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
