/* eslint-disable react/prop-types */
import SearchLoading from "@/components/skeleton/SearchLoading";

const SearchResult = ({ results, searching, onClick }) => {
  if (!results) return;

  if (searching) return <SearchLoading />;

  if (results.length === 0) return <p className="py-2">No Product Found</p>;

  return results.map((result) => (
    <button
      key={result.id}
      onClick={() => onClick(result)}
      className="btn btn-nav justify-start"
    >
      <div className="flex flex-col items-start text-xs md:text-sm">
        <div>{result.name}</div>
      </div>
    </button>
  ));
};

export default SearchResult;
