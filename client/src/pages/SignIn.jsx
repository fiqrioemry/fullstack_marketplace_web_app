import { Link } from "react-router-dom";
import WebLogo from "@/components/ui/WebLogo";
import { useAuthStore } from "@/store/useAuthStore";
import { loginControl, loginState } from "@/config";
import InputForm from "@/components/form/InputForm";
import GoogleAuth from "@/components/auth/GoogleAuth";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { Card, CardContent } from "@/components/ui/card";

const SignIn = () => {
  const { login, loading } = useAuthStore();
  const loginForm = useFormSchema(loginState, loginControl, login);

  return (
    <div className="h-screen flex-center">
      <Card className="w-96">
        <CardContent className="p-4">
          <div className="py-4 text-center">
            <WebLogo />
          </div>
          <InputForm formik={loginForm} formControl={loginControl}>
            <InputButton title={"login"} formik={loginForm} loading={loading} />
          </InputForm>
          <div className="flex-center py-2">OR</div>
          <GoogleAuth buttonTitle={"Signin with google"} />
          <div className="text-center mt-2 space-x-2">
            <span> Dont have an account ? signup</span>
            <Link to="/signup" className="btn-primary">
              here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
