/* eslint-disable react/prop-types */
import SearchLoading from "@/components/loading/SearchLoading";

const SearchResult = ({ results, searching, onClick }) => {
  if (!results) return <SearchRecommendations />;

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

const SearchRecommendations = () => {
  return (
    <div className="h-auto p-2">
      <div className="mb-4">
        <h5 className="font-medium">Last seen Product</h5>
        <div className="grid grid-cols-5 gap-4">
          <img
            className="w-full border aspect-square object-cover rounded-md"
            src="https://placehold.co/400x400"
          />
        </div>
      </div>

      <div className="mb-4">
        <h5 className="font-medium">Last Search History</h5>
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="px-2 py-1 rounded-md border">makanan sehat</div>
          <div className="px-2 py-1 rounded-md border">kulkas</div>
          <div className="px-2 py-1 rounded-md border">coklat batang</div>
        </div>
      </div>

      <div className="mb-2">
        <h5 className="font-medium">Most Popular Category</h5>
        <div className="grid grid-cols-5 gap-4">
          <img
            className="w-full border aspect-square object-cover rounded-md"
            src="https://placehold.co/400x400"
          />
        </div>
      </div>
    </div>
  );
};
