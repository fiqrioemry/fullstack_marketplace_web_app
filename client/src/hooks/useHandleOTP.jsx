import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const useHandleOTP = (email) => {
  const { sendOTP } = useAuthStore();
  const [countdown, setCountdown] = useState(5);
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

  const resendOTP = () => {
    setIsResendDisabled(true);
    setCountdown(countdown + 5);
    sendOTP(email);
  };

  return { resendOTP, countdown, isResendDisabled };
};

export default useHandleOTP;
