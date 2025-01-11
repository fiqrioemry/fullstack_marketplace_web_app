/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OpenStoreForm = ({
  children,
  handleChange,
  formData,
  controlForm,
  submitTitle,
  isLoading,
  isValid,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="text-center">
        <Link to="/">
          <h4 className="text-primary">Open Your Store</h4>
        </Link>
      </div>
      <div className="grid gap-4">
        {controlForm.map((set) => (
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
        {children}
        <Button type="submit" size="md" disabled={!isValid} className="w-full">
          {isLoading ? "loading" : submitTitle}
        </Button>
      </div>
    </form>
  );
};

export default OpenStoreForm;
