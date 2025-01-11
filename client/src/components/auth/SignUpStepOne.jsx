/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpStepOne = ({
  handleSendOtp,
  formData,
  handleChange,
  isValidEmail,
}) => {
  return (
    <form onSubmit={handleSendOtp} className="space-y-6 w-full">
      <div className="text-center">
        <h4>Join our marketplace now</h4>
        <span>
          Already have an account? <Link to="/signin">Sign In</Link>
        </span>
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
      <Button disabled={!isValidEmail} type="submit" className="w-full">
        Sign up
      </Button>
      <div className="text-center text-sm">
        <span>By signing up, I accept the terms and conditions</span>
      </div>
    </form>
  );
};

export default SignUpStepOne;
