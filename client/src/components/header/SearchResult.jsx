/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import SearchLoading from "@/components/loading/SearchLoading";

const SearchResult = ({ results, searchForm, searching }) => {
  const navigate = useNavigate();

  const handleClick = (params) => {
    searchForm.setFieldValue("search", params);
    navigate(`/search?search=${params}`);
  };

  if (!results || searchForm.values.search.length === 0) return null;

  if (searching) return <SearchLoading />;

  if (results.length === 0) return <p className="py-2">No Product Found</p>;

  return (
    <div className="p-2">
      {results.map((result) => (
        <button
          key={result.id}
          onClick={() => handleClick(result.name)}
          className="btn btn-nav w-full justify-start"
        >
          {result.name}
        </button>
      ))}
    </div>
  );
};

export default SearchResult;
