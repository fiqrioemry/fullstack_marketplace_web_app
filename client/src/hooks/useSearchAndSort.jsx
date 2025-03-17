import { useEffect, useCallback } from "react";
import { useFormSchema } from "./useFormSchema";

const useSearchAndSort = (action, state) => {
  const form = useFormSchema(action, state);

  const handleSort = useCallback((key) => {
    form.setValues((prev) => ({
      ...prev,
      sortBy: key,
      orderBy: prev.sortBy === key && prev.orderBy === "asc" ? "desc" : "asc",
    }));
    form.handleSubmit();
  }, []);

  useEffect(() => {
    const trimmedSearch = form.values.search?.trim();

    if (trimmedSearch === "" && form.values.search !== "") return;

    const debounceSearch = setTimeout(() => {
      form.handleSubmit();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [form.values]);

  return { form, handleSort };
};

export default useSearchAndSort;
