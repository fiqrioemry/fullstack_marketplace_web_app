/* eslint-disable react/prop-types */
import { registerControl } from "@/config";
import InputForm from "@/components/form/InputForm";
import InputButton from "@/components/form/InputButton";

const StepThree = ({ registerForm }) => {
  return (
    <div>
      <InputForm formik={registerForm} formControl={registerControl}>
        <InputButton title={"register"} formik={registerForm} />
      </InputForm>
    </div>
  );
};

export default StepThree;
