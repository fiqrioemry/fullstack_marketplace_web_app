/* eslint-disable react/prop-types */
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";
import { sendOTPControl } from "@/config";
import FormInput from "@/components/form/FormInput";
import InputButton from "@/components/form/InputButton";

const StepOne = ({ registerForm }) => {
  return (
    <div className="space-y-4 w-full">
      <div className="text-center">Choose to sign up with</div>
      <GoogleAuth buttonTitle="Signup with google" />
      <div className="text-center">Or continue with</div>
      <FormInput formik={registerForm} formControl={sendOTPControl}>
        <InputButton title={"Register"} formik={registerForm} />
      </FormInput>
      <div className="text-center">
        Already have an account?{" "}
        <Link to="/signin" className="btn-primary">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default StepOne;
