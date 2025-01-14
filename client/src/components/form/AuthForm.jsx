/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import FormControls from "./FormControl";
import { Button } from "@/components/ui/button";

const AuthForm = ({
  children,
  handleChange,
  formData,
  controlForm,
  submitTitle,
  footerTitle,
  footerLink,
  buttonTitle,
  isLoading,
  path,
  isValid,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center">
        <Link to="/">
          <h4 className="text-primary">ShopyPedia</h4>
        </Link>
      </div>
      <div className="grid gap-4">
        <FormControls
          formData={formData}
          formControls={controlForm}
          handleChange={handleChange}
        />

        {children}
        <Button type="submit" size="md" disabled={!isValid} className="w-full">
          {isLoading ? "loading" : submitTitle}
        </Button>

        <span className="text-center text-sm px-2">Or continue with</span>

        <Button
          disabled={isLoading}
          variant="outline"
          size="md"
          className="w-full"
        >
          {buttonTitle}
        </Button>
      </div>
      <div className="text-center text-sm">
        {footerTitle}
        <Link to={path} className="text_button">
          {footerLink}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
