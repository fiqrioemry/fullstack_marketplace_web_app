import { useState } from "react";

export const useHandleForm = (initialFormState) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
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
