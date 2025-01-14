import { Loader } from "lucide-react";
import { initialSignUpForm } from "@/config";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useHandleForm } from "@/hooks/useHandleForm";
import { Card, CardContent } from "@/components/ui/card";
import SignUpStepOne from "../components/auth/SignUpStepOne";
import SignUpStepTwo from "../components/auth/SignUpStepTwo";
import SignUpStepThree from "../components/auth/SignUpStepThree";

const SignUp = () => {
  const navigate = useNavigate();
  const { step, userSignUp, sendOtpSignUp, verifyOtpSignUp, isAuthLoading } =
    useAuthStore();

  const { formData, setFormData, handleChange, handleValidate } =
    useHandleForm(initialSignUpForm);

  const isValid = handleValidate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    sendOtpSignUp(formData);
  };

  const handleVerifyOtp = (formData) => {
    verifyOtpSignUp(formData);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    userSignUp(formData);
    navigate("/signin");
  };

  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <div className="relative hidden lg:block bg-primary" />
      <div className="flex items-center justify-center">
        <Card className="min-w-80 min-h-96">
          <CardContent className="flex min-h-96 items-center justify-center p-4">
            {isAuthLoading && <Loader size={50} className="animate-spin" />}

            {step === 1 && !isAuthLoading && (
              <SignUpStepOne
                formData={formData}
                handleChange={handleChange}
                handleSendOtp={handleSendOtp}
              />
            )}

            {step === 2 && !isAuthLoading && (
              <SignUpStepTwo
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSendOtp={handleSendOtp}
                handleVerifyOtp={handleVerifyOtp}
              />
            )}

            {step === 3 && !isAuthLoading && (
              <SignUpStepThree
                isValid={isValid}
                formData={formData}
                handleChange={handleChange}
                handleSignUp={handleSignUp}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
