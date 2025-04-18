import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { loginControl, loginState } from "@/config";
import FormInput from "@/components/form/FormInput";
import GoogleAuth from "@/components/auth/GoogleAuth";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/ui/Logo";

const SignIn = () => {
  const { login, loading } = useAuthStore();
  const loginForm = useFormSchema(login, loginState, loginControl);

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-96">
        <CardContent className="p-4">
          <div className="py-4 text-center">
            <Logo />
          </div>
          <FormInput formik={loginForm} formControl={loginControl}>
            <InputButton title={"login"} formik={loginForm} loading={loading} />
          </FormInput>
          <div className="flex items-center justify-center py-2">OR</div>
          <GoogleAuth buttonTitle={"Signin with google"} />
          <div className="text-center mt-2 space-x-2">
            <span> Dont have an account ? signup</span>
            <Link to="/signup" className="btn-accent">
              here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
