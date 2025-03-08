const SearchBar = () => {
  return (
    <div className="w-96">
      <input
        name="search"
        placeholder="Enter product keywords ...."
        className="py-2 px-4 border border-muted-foreground rounded-md w-full focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
