/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { controlSignUpForm } from "@/config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SignUpStepThree = ({ handleSignUp, handleChange, formData, isValid }) => {
  return (
    <form onSubmit={handleSignUp} className="w-full">
      <div className="text-center">
        <Link to="/">
          <h4 className="text-primary">ShopyPedia</h4>
        </Link>
      </div>
      <div className="grid gap-6">
        {controlSignUpForm.map((set) => (
          <div className="grid gap-2 capitalize" key={set.name}>
            <Label htmlFor={set.name}>{set.name}</Label>
            <Input
              id={set.name}
              name={set.name}
              type={set.type}
              value={formData[set.name]}
              onChange={handleChange}
              placeholder={
                set.name === "email" ? formData.email : set.placeholder
              }
              disabled={set.name === "email" && formData.email}
              required
            />
          </div>
        ))}
        <Button disabled={!isValid} type="submit" size="md" className="w-full">
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUpStepThree;
