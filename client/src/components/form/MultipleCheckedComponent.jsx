/* eslint-disable react/prop-types */
import { useCallback } from "react";
import InputLabel from "./InputLabel";

const MultipleCheckedComponent = ({
  name,
  value,
  label,
  formik,
  options,
  disabled,
}) => {
  const handleChange = useCallback(
    (optionName) => {
      const newValues = value.includes(optionName)
        ? value.filter((val) => val !== optionName)
        : [...value, optionName];

      formik.setFieldValue(name, newValues);
    },
    [formik, value, name]
  );

  return (
    <div>
      {label && <InputLabel formik={formik} label={label} name={name} />}

      {options.map((option) => (
        <div
          className="flex items-center space-x-3 py-2 px-3"
          key={option.id || option}
        >
          <input
            id={option.id || option}
            type="checkbox"
            disabled={disabled}
            checked={value.includes(option.slug || option)}
            onChange={() => handleChange(option.slug || option)}
            className="w-4 h-4"
          />
          <label htmlFor={option?.id || option}>{option?.name || option}</label>
        </div>
      ))}
    </div>
  );
};

export default MultipleCheckedComponent;
