import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ProductCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState({
    query: "",
    page: "",
  });

  const [data, setData] = useState();

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      query: searchParams.get("query") || "",
      page: searchParams.get("page") || "",
      city: searchParams.get("city") || "",
    }));
  }, [searchParams]);

  useEffect(() => {
    setData((prev) => ({ ...prev, query: form.query, page: form.page }));
  }, []);

  const handleChange = () => {
    setSearchParams((prev) => ({ ...prev, city: "Jakarta" }));
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <button onClick={handleChange} className="bg-red-500">
        Click
      </button>
    </section>
  );
};

export default ProductCategory;
