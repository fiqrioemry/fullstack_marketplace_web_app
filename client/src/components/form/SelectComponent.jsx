/* eslint-disable react/prop-types */
import InputLabel from "./InputLabel";

const SelectComponent = ({
  formik,
  name,
  label,
  type,
  value,
  options,
  disabled,
  placeholder,
  handleChange,
}) => {
  if (!options) return null;

  return (
    <div>
      <InputLabel formik={formik} name={name} label={label} />
      <select
        id={label}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        className="p-2 w-full border border-muted-foreground/50 rounded-md"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option?.id || option} key={option?.id || option}>
            {option?.name || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
