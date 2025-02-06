import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import WebLogo from "@/components/ui/WebLogo";
import { useAuthStore } from "@/store/useAuthStore";
import { loginControl, loginState } from "@/config";
import InputForm from "@/components/form/InputForm";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";

const SignIn = () => {
  const { login, loading } = useAuthStore();
  const loginForm = useFormSchema(loginState, loginControl, login);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-xs">
        <div className="w-full p-4 space-y-6">
          <div className="text-center">
            <WebLogo />
          </div>

          <InputForm formik={loginForm} formControl={loginControl}>
            <InputButton title={"login"} formik={loginForm} loading={loading} />
          </InputForm>
          <div className="text-center text-sm">
            Dont have an account ? register{" "}
            <Link to="/signup" className="text_button">
              here
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
