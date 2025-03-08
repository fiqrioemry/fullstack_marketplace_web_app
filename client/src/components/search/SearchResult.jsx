/* eslint-disable react/prop-types */
import SearchLoading from "@/components/skeleton/SearchLoading";

const SearchResult = ({ users, searching, onClick }) => {
  if (!users) return;

  if (searching) return <SearchLoading />;

  if (users.length === 0) return <p className="py-2">No Product Result</p>;

  return users.map((user) => (
    <button
      key={user.userId}
      onClick={() => onClick(user)}
      className="btn btn-nav"
    >
      <div className="flex flex-col items-start text-xs md:text-sm"></div>
    </button>
  ));
};

export default SearchResult;
