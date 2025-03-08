const SearchBar = () => {
  return (
    <div className="flex-1 max-w-md md:max-w-xl w-full">
      <input
        placeholder="Search product you want ..."
        className="py-2 px-4 rounded-md border border-muted focus:outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;
