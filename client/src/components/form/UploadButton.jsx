/* eslint-disable react/prop-types */
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const UploadButton = ({ title, inputName, icon, action, loading, variant }) => {
  return (
    <Button
      variant={variant}
      disabled={loading}
      className="relative w-full overflow-hidden"
    >
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <div>{icon}</div>
          <span>{title}</span>
        </>
      )}
      <label
        htmlFor="file"
        className="absolute z-10 h-full w-full bg-transparent"
      >
        <input
          id="file"
          name={inputName}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={action}
          disabled={loading}
        />
      </label>
    </Button>
  );
};

export default UploadButton;
