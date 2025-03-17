import InputLabel from "./InputLabel";

/* eslint-disable react/prop-types */
const InputNumberComponent = ({
  label,
  type,
  name,
  formik,
  value,
  disabled,
  placeholder,
  onBlur,
  maxLength,
}) => {
  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value && Number(value) <= 0) value = "";
    formik.setFieldValue(name, value);
  };

  return (
    <div className="mb-4">
      {label && <InputLabel formik={formik} name={name} label={label} />}

      <input
        id={label}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onBlur={onBlur}
        onChange={handleChange}
        placeholder={placeholder}
        className="p-2 w-full border rounded-md"
        maxLength={maxLength}
      />
    </div>
  );
};

export default InputNumberComponent;
