/* eslint-disable react/prop-types */
const SingleCheckedComponent = ({
  label,
  name,
  type,
  value,
  formik,
  disabled,
}) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    formik.setFieldValue(name, checked);
  };
  return (
    <div className="flex items-center gap-2">
      <input
        id={label}
        name={name}
        type={type}
        checked={value}
        disabled={disabled}
        className="w-5 h-5"
        onChange={handleChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default SingleCheckedComponent;
