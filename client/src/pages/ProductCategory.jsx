import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ProductCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState({
    category: [],
    city: [],
  });

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setForm({
      city: params.city ? params.city.split(",") : [],
      category: params.category ? params.category.split(",") : [],
    });
  }, [searchParams]);

  const handleChange = ({ target: { name, value } }) => {
    const params = Object.fromEntries(searchParams.entries());

    const arrayParams = ["city", "category"];

    if (arrayParams.includes(name)) {
      const currentValues = params[name] ? params[name].split(",") : [];

      if (currentValues.includes(value)) {
        // Hapus nilai jika sudah ada
        params[name] = currentValues.filter((item) => item !== value).join(",");
      } else {
        // Tambahkan nilai jika belum ada
        params[name] = [...currentValues, value].join(",");
      }
    } else {
      params[name] = value;
    }

    // Jika parameter menjadi string kosong atau array kosong, hapus dari URL
    if (!params[name]) {
      delete params[name];
    }

    setSearchParams(params);
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-[25rem] p-4 space-y-4">
        <div>
          <label htmlFor="medan">medan</label>
          <input
            id="medan"
            name="city"
            type="checkbox"
            checked={form.city.includes("medan")}
            value="medan"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="jakarta">jakarta</label>
          <input
            id="jakarta"
            type="checkbox"
            name="city"
            checked={form.city.includes("jakarta")}
            value="jakarta"
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductCategory;
