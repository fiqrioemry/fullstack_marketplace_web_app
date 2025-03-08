import { searchState } from "@/config";
import { useFormSchema } from "./useFormSchema";
import { useCallback, useEffect, useRef, useState } from "react";

const useSearchProducts = (searchUser) => {
  const searchRef = useRef(null);
  const debounceRef = useRef(null);
  const searchForm = useFormSchema(searchState);
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    setOpenSearch((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
        searchForm.resetForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch]);

  const searchHandler = useCallback(() => {
    if (!searchForm.values.search.trim()) return;
    searchUser(searchForm.values.search);
  }, [searchForm.values.search, searchUser]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(searchHandler, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchForm.values.search, searchHandler]);

  return {
    searchForm,
    searchRef,
    openSearch,
    handleSearch,
  };
};

export default useSearchProducts;
