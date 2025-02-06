import { Loader } from "lucide-react";
import WebLogo from "@/components/ui/WebLogo";
import StepOne from "@/components/auth/StepOne";
import StepTwo from "@/components/auth/StepTwo";
import StepThree from "@/components/auth/StepThree";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { Card, CardContent } from "@/components/ui/card";
import {
  registerState,
  registerControl,
  sendOTPControl,
  verifyOTPControl,
} from "@/config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { step, loading, register } = useAuthStore();

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
    navigate
  );

  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <div className="relative hidden lg:block bg-primary">
        <div className="h-screen w-full">
          <img className="h-full w-full" src="/public/register.webp" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Card className="min-w-80 h-96">
          <CardContent className="p-4">
            <div className="text-center">
              <WebLogo />
            </div>
            <div className="h-72 pt-8">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader size={50} className="animate-spin" />
                </div>
              ) : (
                <div>
                  {step === 1 && <StepOne registerForm={registerForm} />}

                  {step === 2 && <StepTwo registerForm={registerForm} />}

                  {step === 3 && <StepThree registerForm={registerForm} />}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
