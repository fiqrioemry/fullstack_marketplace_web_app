/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import { useFormSchema } from "./useFormSchema";
import { useCallback, useEffect, useRef, useState } from "react";

const useSearchProducts = (searchFunction) => {
  const searchRef = useRef(null);
  const debounceRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchState = {
    search: searchParams.get("search") || "",
  };

  const searchForm = useFormSchema(searchFunction, searchState);

  const handleSearch = () => {
    setOpenSearch(true);
  };

  const handleBlur = () => {
    if (!document.hasFocus()) return;
    setOpenSearch(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        document.activeElement === searchRef.current
      ) {
        setOpenSearch(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const searchHandler = useCallback(() => {
    if (!searchForm.values.search.trim()) return;
    searchFunction(searchForm.values.search);
  }, [searchForm.values.search, searchFunction]);

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
    handleBlur,
  };
};

export default useSearchProducts;
