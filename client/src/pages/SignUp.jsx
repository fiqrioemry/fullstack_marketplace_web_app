import {
  registerState,
  registerControl,
  sendOTPControl,
  verifyOTPControl,
} from "@/config";
import { Loader } from "lucide-react";
import WebLogo from "@/components/ui/WebLogo";
import { useNavigate } from "react-router-dom";
import StepOne from "@/components/auth/StepOne";
import StepTwo from "@/components/auth/StepTwo";
import StepThree from "@/components/auth/StepThree";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { Card, CardContent } from "@/components/ui/card";

const SignUp = () => {
  const navigate = useNavigate();
  const { step, signup, loading } = useAuthStore();

  const getFormControl = () => {
    switch (step) {
      case 1:
        return sendOTPControl;
      case 2:
        return verifyOTPControl;
      case 3:
        return registerControl;
      default:
        return [];
    }
  };

  const signUpForm = useFormSchema(
    registerState,
    getFormControl(),
    signup,
    navigate,
    false
  );

  return (
    <div className="h-screen flex-center">
      <Card className="min-w-80 h-96">
        <CardContent className="p-4">
          <div className="text-center">
            <WebLogo />
          </div>

          <div className="h-72 pt-6">
            {loading ? (
              <div className="h-full flex-center">
                <Loader size={50} className="animate-spin" />
              </div>
            ) : (
              <>
                {step === 1 && (
                  <StepOne
                    signUpForm={signUpForm}
                    formControl={sendOTPControl}
                  />
                )}

                {step === 2 && (
                  <StepTwo
                    signUpForm={signUpForm}
                    formControl={verifyOTPControl}
                  />
                )}

                {step === 3 && (
                  <StepThree
                    signUpForm={signUpForm}
                    formControl={registerControl}
                  />
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
