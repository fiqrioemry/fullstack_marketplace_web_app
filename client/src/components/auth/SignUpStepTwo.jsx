/* eslint-disable react/prop-types */
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Mail } from "lucide-react";
import { useState, useEffect } from "react";

const SignUpStepTwo = ({
  formData,
  setFormData,
  handleSendOtp,
  handleVerifyOtp,
}) => {
  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (countdown === 0) {
      setIsResendDisabled(false);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendCode = (e) => {
    e.preventDefault();
    setIsResendDisabled(true);
    setCountdown(30);
    handleSendOtp(e);
  };

  const handleOtpChange = (value) => {
    // Update nilai OTP di formData
    setFormData((prev) => {
      const updatedFormData = { ...prev, otp: value };

      if (value.length === 6) {
        handleVerifyOtp(updatedFormData);
      }

      return updatedFormData;
    });
  };

  return (
    <form onSubmit={handleVerifyOtp} className="space-y-4">
      <div className="space-y-4">
        <div className="flex justify-center">
          <Mail size={40} />
        </div>

        <div className="text-center">
          <h5>Enter Verification Code</h5>
          <div>Your verification code has been sent to:</div>
          <span>{formData.email}</span>
        </div>
      </div>

      <div className="flex flex-col space-y-4 items-center justify-center">
        <InputOTP maxLength={6} value={formData.otp} onChange={handleOtpChange}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <div className="text-sm">
          {countdown > 0 ? (
            <span>
              Please wait <b>{countdown}s</b> to resend code
            </span>
          ) : (
            <span>
              Did not receive the code?{" "}
              <button
                className="text_button"
                type="button"
                onClick={handleResendCode}
                disabled={isResendDisabled}
              >
                Resend
              </button>
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignUpStepTwo;
