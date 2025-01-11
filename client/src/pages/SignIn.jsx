import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/form/AuthForm";
import { useAuthStore } from "@/store/useAuthStore";
import { useHandleForm } from "@/hooks/useHandleForm";
import SignInHelp from "../components/modal/SignInHelp";
import { controlSignInForm, initialSignInForm } from "@/config";
import { ModalContainer } from "../components/modal/ModalContainer";

const SignIn = () => {
  const navigate = useNavigate();
  const { userSignIn, isAuthLoading } = useAuthStore();
  const { formData, handleChange, handleSubmit, handleValidate } =
    useHandleForm(initialSignInForm);

  const isValid = handleValidate();

  const onSubmit = () => userSignIn(formData, navigate);

  return (
    <div className="grid min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-xs p-4">
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
            >
              <div className="flex justify-end text-center text-xs">
                <ModalContainer
                  title={<button type="button">Need help ?</button>}
                >
                  <SignInHelp />
                </ModalContainer>
              </div>
            </AuthForm>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
