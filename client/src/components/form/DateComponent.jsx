import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateComponent = ({ formik, name, label, value, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">{label}</label>
      <DatePicker
        selected={value}
        // eslint-disable-next-line react/prop-types
        onChange={(date) => formik.setFieldValue(name, date)}
        dateFormat="dd MMMM yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText={placeholder}
        className="border p-2 rounded w-full text-center"
      />
    </div>
  );
};

export default DateComponent;
