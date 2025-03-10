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
  maxLength,
}) => {
  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value && Number(value) <= 0) value = "";
    formik.setFieldValue(name, value);
  };

  return (
    <div className="mb-4">
      <InputLabel formik={formik} name={name} label={label} />
      <input
        id={label}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        className="p-2 w-full border border-muted-foreground/50 rounded-md"
        maxLength={maxLength}
      />
    </div>
  );
};

export default InputNumberComponent;
