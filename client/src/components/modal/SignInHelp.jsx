import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SignInHelp = () => {
  return (
    <div className="h-40 w-full flex flex-col items-center justify-center space-y-6">
      <h5>What kind of help do you need ?</h5>
      <Link
        to="/reset-password"
        className="w-full py-2 px-4 rounded-md border bg-primary text-background flex items-center justify-center hover:bg-primary/80 duration-300 transition-all"
      >
        Reset password
      </Link>
    </div>
  );
};

export default SignInHelp;
