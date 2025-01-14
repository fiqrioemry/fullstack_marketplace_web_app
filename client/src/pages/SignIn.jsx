import { Card } from "@/components/ui/card";
import AuthForm from "@/components/form/AuthForm";
import { useAuthStore } from "@/store/useAuthStore";
import { useHandleForm } from "@/hooks/useHandleForm";
import { SignInHelp } from "../components/modal/SignInHelp";
import { controlSignInForm, initialSignInForm } from "@/config";

const SignIn = () => {
  const { userSignIn, isAuthLoading } = useAuthStore();
  const { formData, handleChange, handleSubmit, handleValidate } =
    useHandleForm(initialSignInForm);

  const isValid = handleValidate();

  const onSubmit = () => userSignIn(formData);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-xs p-4">
        <AuthForm
          path="/signup"
          isValid={isValid}
          formData={formData}
          submitTitle={"Sign-In"}
          footerLink={"Sign up "}
          isLoading={isAuthLoading}
          handleChange={handleChange}
          controlForm={controlSignInForm}
          buttonTitle={"Sign In with Google"}
          footerTitle={"Dont have an account ? "}
          onSubmit={(e) => handleSubmit(e, onSubmit)}
        >
          <div className="flex justify-end text-xs">
            <SignInHelp button="need a help ?" />
          </div>
        </AuthForm>
      </Card>
    </div>
  );
};

export default SignIn;
