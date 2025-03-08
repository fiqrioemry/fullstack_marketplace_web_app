import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import { useAuthStore } from "@/store/useAuthStore";
import SearchInput from "@/components/header/SearchInput";
import { useProductStore } from "@/store/useProductStore";
import useSearchProducts from "@/hooks/useSearchProducts";
import SearchResult from "@/components/header/SearchResult";
import NavigationMenu from "@/components/header/NavigationMenu";

const Header = () => {
  const { user } = useAuthStore();

  const { searchProducts, results, searching } = useProductStore();
  const { searchForm, searchRef, openSearch, handleSearch } =
    useSearchProducts(searchProducts);

  const searchActive = cn(
    openSearch ? "w-0 md:w-auto" : "w-auto",
    "overflow-hidden delay-50 duration-300 ease-in-out transition-all"
  );

  const inputActive = cn(
    openSearch ? "w-full md:w-96" : "max-w-lg md:max-w-xl",
    " relative duration-300"
  );

  const resultActive = cn(
    openSearch ? "max-h-96" : "max-h-0",
    "absolute top-11 right-0 left-0 bg-background border rounded-lg shadow-lg border-muted overflow-hidden z-40 duration-300 ease-in-out  transition-all"
  );

  return (
    <header className="border-b py-2 px-2">
      <div className="flex items-center justify-between container mx-auto">
        {/* Website Logo */}
        <div className={searchActive}>
          <Logo />
        </div>

        {/* search products*/}
        <div ref={searchRef} className={inputActive}>
          <SearchInput handleSearch={handleSearch} searchForm={searchForm} />

          <div className={resultActive}>
            <SearchResult results={results} searching={searching} />
          </div>
        </div>

        {/* Navigation menu */}
        <div className={searchActive}>
          <NavigationMenu user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
