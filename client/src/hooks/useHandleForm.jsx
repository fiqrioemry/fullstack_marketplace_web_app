import { useState } from "react";

const contactFields = ["phone", "zipcode"];

const numericFields = ["minPrice", "maxPrice", "price", "stock", "quantity"];

export const useHandleForm = (initialFormState) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (numericFields.includes(name)) {
      const formatValue = value
        .replace(/^0+/, "")
        .replace(/^-/, "")
        .replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: formatValue,
      }));
    } else if (contactFields.includes(name)) {
      const formatValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: formatValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleValidate = () => {
    const isFormValid = Object.values(formData).every((value) =>
      typeof value === "string" ? value.trim() !== "" : !!value
    );

    return isFormValid;
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
