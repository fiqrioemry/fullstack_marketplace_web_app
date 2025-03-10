import {
  registerState,
  registerControl,
  sendOTPControl,
  verifyOTPControl,
} from "@/config";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useNavigate } from "react-router-dom";
import StepOne from "@/components/auth/StepOne";
import StepTwo from "@/components/auth/StepTwo";
import StepThree from "@/components/auth/StepThree";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { Card, CardContent } from "@/components/ui/card";

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
    register,
    registerState,
    getFormControl(),
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
            <Logo />
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
