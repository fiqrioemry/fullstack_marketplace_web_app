/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpStepOne = ({ handleSendOtp, formData, handleChange }) => {
  const isValidEmail = () => {
    return (
      formData.email.length !== 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
  };
  return (
    <form onSubmit={handleSendOtp} className="space-y-6 w-full">
      <div className="text-center space-y-4">
        <h4>
          Join <span className="text-primary text-semibold">ShopyPedia</span>{" "}
          now
        </h4>
        <div className="text-sm">Choose to sign up with </div>
      </div>

      <Button variant="outline" className="w-full py-5">
        <FcGoogle /> <span>Google</span>
      </Button>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or
        </span>
      </div>

      <Input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="w-full py-5"
      />
      <Button disabled={!isValidEmail()} type="submit" className="w-full">
        Sign up
      </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary hover:font-semibold">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignUpStepOne;
