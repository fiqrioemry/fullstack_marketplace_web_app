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
    openSearch ? "w-0 md:w-auto" : "w-36 md:w-auto",
    "overflow-hidden  delay-50  duration-150 ease-in transition-all"
  );

  const inputActive = cn(
    openSearch ? "w-full md:w-96" : "w-96",
    "flex-1 relative duration-300 ease-in transition-all"
  );

  const resultActive = cn(
    openSearch ? "max-h-96" : "max-h-0",
    "absolute top-11 right-0 left-0 bg-background  rounded-lg shadow-lg  overflow-hidden z-40 delay-300 duration-150 ease-in transition-all"
  );

  return (
    <div className="h-14">
      <header className="border-b py-2 px-2 fixed w-full z-50 bg-background">
        <div className="flex items-center justify-between container mx-auto gap-4">
          {/* Website Logo */}
          <div className="hidden md:flex px-2">
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
    </div>
  );
};

export default Header;
