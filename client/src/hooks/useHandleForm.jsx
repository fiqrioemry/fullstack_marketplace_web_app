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
    const isValidate = Object.values(initialFormState).every(
      (value) => !value.trim()
    );

    if (isValidate) {
      const allFieldsFilled = Object.keys(formData).every((key) => {
        return formData[key]?.trim();
      });
      return allFieldsFilled;
    }

    const allowedEmptyFields = Object.keys(initialFormState).filter(
      (key) => !initialFormState[key]?.trim()
    );

    const hasEmptyRequiredField = Object.keys(formData).some((key) => {
      const currentValue = formData[key]?.trim();
      return !allowedEmptyFields.includes(key) && !currentValue;
    });

    if (hasEmptyRequiredField) {
      return false;
    }

    const hasChanges = Object.keys(initialFormState).some((key) => {
      const trimmedInitial = initialFormState[key]?.trim() || "";
      const trimmedCurrent = formData[key]?.trim() || "";
      return trimmedInitial !== trimmedCurrent;
    });

    return hasChanges;
  };

  const handleSubmit = async (e, process, end) => {
    e.preventDefault();
    const response = await process();
    end(response);
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    handleValidate,
  };
};
