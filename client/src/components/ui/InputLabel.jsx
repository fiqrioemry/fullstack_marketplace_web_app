/* eslint-disable react/prop-types */
import { Label } from "./label";

const InputLabel = ({ formik, control }) => {
  return (
    <div className="flex items-center gap-2 h-4 mb-2">
      <Label htmlFor={control.label}>{control.label}</Label>
      {formik.touched[control.name] && formik.errors[control.name] && (
        <h6>{formik.errors[control.name]}</h6>
      )}
    </div>
  );
};

export default InputLabel;
