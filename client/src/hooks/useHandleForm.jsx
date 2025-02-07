import { useState, useCallback } from "react";

const contactFields = ["phone", "zipcode"];
const numericFields = ["minPrice", "maxPrice", "price", "stock", "quantity"];

export const useHandleForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((e) => {
    const { name, type, value, checked } = e.target;

    let formattedValue = value;

    // Format for numeric fields
    if (numericFields.includes(name)) {
      formattedValue = value
        .replace(/^0+/, "")
        .replace(/^-/, "")
        .replace(/[^0-9]/g, "");
    }
    // Format for contact fields
    else if (contactFields.includes(name)) {
      formattedValue = value.replace(/[^0-9]/g, "");
    }
    // Checkbox handling
    else if (type === "checkbox") {
      formattedValue = checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  }, []);

  const handleValidate = () => {
    return Object.values(formData).every((value) =>
      typeof value === "string" ? value.trim() !== "" : !!value
    );
  };

  const handleSubmit = async (e, process) => {
    e.preventDefault();
    process();
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    handleValidate,
  };
};
