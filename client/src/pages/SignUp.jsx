import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useHandleForm } from "@/hooks/useHandleForm";
import { Card, CardContent } from "@/components/ui/card";
import { controlSignUpForm, initialSignUpForm } from "@/config";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader, Mail } from "lucide-react";

const SignUp = () => {
  const [verifyStatus, setVerifyStatus] = useState();
  const {
    userSignUp,
    userData,
    sendOtpSignUp,
    verifyOtpSignUp,
    isAuthLoading,
  } = useAuthStore();
  const { formData, handleChange, handleValidate } =
    useHandleForm(initialSignUpForm);

  const isInputValid = () => {
    "must be a correct email ";
  };

  const isInputOtpValid = () => {
    "must be a correct email ";
  };

  const isValid = handleValidate();

  const handleSendOtp = () => {
    sendOtpSignUp(formData.email);
  };

  const handleVerifyOtp = () => {
    const status = verifyOtpSignUp(formData.email, formData.otp);
    setVerifyStatus(status);
  };

  const handleSignUp = () => {
    userSignUp(formData);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <div className="w-full h-full bg-primary"></div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* when step 1 2 and 3 is loading */}
            {isAuthLoading && (
              <div className="space-y-6 h-96 w-full flex items-center justify-center">
                <Loader size={50} className="animate-spin" />
              </div>
            )}
            {/* step 1 */}
            {!userData && (
              <form onSubmit={handleSendOtp} className="space-y-6 w-full">
                <div className="text-center">
                  <h4>Join our marketplace now</h4>
                  <span>
                    Already have an account ? <Link to="/signin">Sign In</Link>
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
                  value={formData["email"]}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full py-5"
                />
                <Button
                  disabled={isInputValid()}
                  type="submit"
                  className="w-full"
                >
                  Sign up
                </Button>
                <div className="text-center text-sm">
                  <span>By signing up, I accept the terms and conditions</span>
                </div>
              </form>
            )}

            {/* step 2 */}
            {userData && !verifyStatus && (
              <Card>
                <CardContent className="p-4">
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Mail size={40} />
                      </div>

                      <div className="text-center">
                        <h5>Enter Verification Code</h5>
                        <div>Your verification code has been sent to :</div>
                        <span>ardyirawan8771a@gmail.com.</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-4 items-center justify-center">
                      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      <div className="text-sm">
                        <span>Didnt received the code ? resend</span>
                      </div>
                    </div>

                    <Button disabled={isInputOtpValid()} className="w-full">
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* step 3 */}
            {verifyStatus && (
              <form onSubmit={handleSignUp} className="flex flex-col gap-6">
                <div className="text-center">
                  <Link to="/">
                    <h4 className="text-primary">ShopyPedia</h4>
                  </Link>
                </div>
                <div className="grid gap-6">
                  {controlSignUpForm.map((set) => (
                    <div className="grid gap-2 capitalize" key={set.name}>
                      <Label htmlFor={set.name} className>
                        {set.name}
                      </Label>
                      <Input
                        id={set.name}
                        name={set.name}
                        type={set.type}
                        value={formData[set.name]}
                        onChange={handleChange}
                        placeholder={set.placeholder}
                        required
                      />
                    </div>
                  ))}
                  <Button
                    disabled={!isValid}
                    type="submit"
                    size="md"
                    className="w-full"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
