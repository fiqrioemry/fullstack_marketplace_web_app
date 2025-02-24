import SearchNav from "../navigation/SearchNav";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-2 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h3>Marketplace</h3>
          </Link>
          <SearchNav />
          <NavMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
