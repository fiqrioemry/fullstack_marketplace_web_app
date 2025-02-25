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
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const { step, resetStep, register, loading } = useAuthStore();

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

  const registerForm = useFormSchema(
    registerState,
    getFormControl(),
    register,
    navigate,
    false
  );

  useEffect(() => {
    resetStep();
  }, []);

  return (
    <div className="h-screen flex-center">
      <Card className="w-96 h-96">
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
                    registerForm={registerForm}
                    formControl={sendOTPControl}
                  />
                )}

                {step === 2 && (
                  <StepTwo
                    registerForm={registerForm}
                    formControl={verifyOTPControl}
                  />
                )}

                {step === 3 && (
                  <StepThree
                    registerForm={registerForm}
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
