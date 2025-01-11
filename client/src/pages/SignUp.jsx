import { Loader } from "lucide-react";
import { initialSignUpForm } from "@/config";
import { useAuthStore } from "@/store/useAuthStore";
import { useHandleForm } from "@/hooks/useHandleForm";
import { Card, CardContent } from "@/components/ui/card";
import SignUpStepOne from "../components/auth/SignUpStepOne";
import SignUpStepTwo from "../components/auth/SignUpStepTwo";
import SignUpStepThree from "../components/auth/SignUpStepThree";

const SignUp = () => {
  const { step, userSignUp, sendOtpSignUp, verifyOtpSignUp, isAuthLoading } =
    useAuthStore();

  const { formData, handleChange, handleValidate } =
    useHandleForm(initialSignUpForm);

  const isValidEmail = () => {
    return (
      formData.email.length !== 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
  };

  console.log(step);

  const isValid = handleValidate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    console.log("success");
    sendOtpSignUp(formData);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    verifyOtpSignUp(formData);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    userSignUp(formData);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <div className="w-full h-full bg-primary"></div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Card className="min-w-80 min-h-96">
              <CardContent className="flex min-h-96 items-center justify-center p-4">
                {isAuthLoading && <Loader size={50} className="animate-spin" />}

                {step === 1 && !isAuthLoading && (
                  <SignUpStepOne
                    formData={formData}
                    handleChange={handleChange}
                    handleSendOtp={handleSendOtp}
                    isValidEmail={isValidEmail()}
                  />
                )}

                {step === 2 && !isAuthLoading && (
                  <SignUpStepTwo
                    formData={formData}
                    handleChange={handleChange}
                    handleVerifyOtp={handleVerifyOtp}
                  />
                )}

                {step === 3 && !isAuthLoading && (
                  <SignUpStepThree
                    formData={formData}
                    handleChange={handleChange}
                    handleSignUp={handleSignUp}
                    isValid={isValid}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
