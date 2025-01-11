/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FormControls from "./FormControl";

const OpenStoreForm = ({
  formData,
  controlForm,
  submitTitle,
  isLoading,
  isValid,
  setFormData,
  handleChange,
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
        <FormControls
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
          formControls={controlForm}
        />
        <Button type="submit" size="md" disabled={!isValid} className="w-full">
          {isLoading ? "loading" : submitTitle}
        </Button>
      </div>
    </form>
  );
};

export default OpenStoreForm;
