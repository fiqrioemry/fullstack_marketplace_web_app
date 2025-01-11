import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Mail } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const SignUpStepTwo = ({
  handleVerifyOtp,
  handleSendOtp,
  formData,
  handleChange,
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

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
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
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          name="otp"
          value={formData.otp}
          onChange={handleOtpChange}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-sm">
          {countdown > 0 ? (
            <span>
              Please wait <b>{countdown}s</b> to resend code
            </span>
          ) : (
            <span>
              Didnt receive the code ?{" "}
              <button
                className="text-primary font-semibold"
                type="button"
                onClick={handleResendCode}
                disabled={isResendDisabled}
              >
                resend
              </button>
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignUpStepTwo;
