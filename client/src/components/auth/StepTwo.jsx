/* eslint-disable react/prop-types */
import { Mail } from "lucide-react";
import { verifyOTPControl } from "@/config";
import useHandleOTP from "@/hooks/useHandleOTP";
import FormInput from "@/components/form/FormInput";
import InputButton from "@/components/form/InputButton";

const StepTwo = ({ registerForm }) => {
  const { countdown, resendOTP, isSendDisabled } = useHandleOTP(
    registerForm.values.email
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col items-center text-center ">
        <Mail size={40} />
        <h4>Enter Verification Code</h4>
        <p className="text-sm text-gray-600">
          Your verification code has been sent to:
        </p>
        <span className="font-medium">{registerForm.values.email}</span>
      </div>

      {/* Form */}
      <div className="flex flex-col items-center space-y-2 mt-6">
        <FormInput formik={registerForm} formControl={verifyOTPControl}>
          <InputButton title="Submit" formik={registerForm} />
        </FormInput>

        {/* Resend OTP */}
        <div>
          {countdown > 0 ? (
            <span>
              Please wait <b>{countdown}s</b> to resend code
            </span>
          ) : (
            <div className="text-sm md:text-md">
              <span>Didn&apos;t receive the code?</span>
              <button
                type="button"
                onClick={resendOTP}
                className="btn-primary"
                disabled={isSendDisabled}
              >
                Resend
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
