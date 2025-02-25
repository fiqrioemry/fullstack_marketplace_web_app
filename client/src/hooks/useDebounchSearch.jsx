import { useEffect, useRef } from "react";

const useDebouncedSearch = (searchValue, delay, callback) => {
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!searchValue.trim()) return;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      callback(searchValue);
    }, delay);

    return () => clearTimeout(debounceRef.current);
  }, [searchValue, delay, callback]);
};

export default useDebouncedSearch;
