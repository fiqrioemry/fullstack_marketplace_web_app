/* eslint-disable react/prop-types */
import { registerControl } from "@/config";
import FormInput from "@/components/form/FormInput";
import InputButton from "@/components/form/InputButton";

const StepThree = ({ registerForm }) => {
  return (
    <div>
      <FormInput formik={registerForm} formControl={registerControl}>
        <InputButton title={"register"} formik={registerForm} />
      </FormInput>
    </div>
  );
};

export default StepThree;
