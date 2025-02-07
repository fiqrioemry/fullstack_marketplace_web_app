import {
  loginState,
  loginControl,
  registerState,
  registerControl,
} from "@/config";
import InputForm from "../form/InputForm";
import InputButton from "../form/InputButton";
import ProcessButton from "../form/processButton";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormSchema } from "@/hooks/useFormSchema";

const Authentication = () => {
  const { login, register, logout, loading } = useAuthStore();
  const loginForm = useFormSchema(loginState, loginControl, login);
  const registerForm = useFormSchema(registerState, registerControl, register);
  return (
    <div className="grid grid-cols-2 gap-8 py-12 container mx-auto">
      {/* login form*/}
      <div className="space-y-4 text-center">
        <h4>Login Form Demo</h4>
        <InputForm formik={loginForm} formControl={loginControl}>
          <InputButton formik={loginForm} loading={loading} title="Login" />
        </InputForm>
      </div>

      {/* register form */}
      <div className="space-y-4 text-center">
        <h4>Register Form Demo</h4>
        <InputForm formik={registerForm} formControl={loginControl}>
          <InputButton
            formik={registerForm}
            loading={loading}
            title="register"
          />
        </InputForm>
      </div>
      <div>
        <ProcessButton title="logout" onClick={logout} loading={loading} />
      </div>
    </div>
  );
};

export default Authentication;
