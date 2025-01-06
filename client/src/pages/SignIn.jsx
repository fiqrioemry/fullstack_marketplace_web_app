import AuthForm from "@/components/form/AuthForm";
import { useAuthStore } from "@/store/useAuthStore";
import { useHandleForm } from "@/hooks/useHandleForm";
import { controlSignInForm, initialSignInForm } from "@/config";

const SignIn = () => {
  const { userSignIn, isAuthLoading } = useAuthStore();
  const { formData, handleChange, handleSubmit, handleValidate } =
    useHandleForm(initialSignInForm);

  const isValid = handleValidate();

  const onSubmit = () => userSignIn(formData);

  return (
    <div className="grid min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm
              onSubmit={(e) => handleSubmit(e, onSubmit)}
              formData={formData}
              isLoading={isAuthLoading}
              controlForm={controlSignInForm}
              submitTitle={"Sign-In"}
              buttonTitle={"Sign In with Google"}
              footerTitle={"Dont have an account ? "}
              footerLink={"Sign up "}
              path="/signup"
              handleChange={handleChange}
              isValid={isValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
