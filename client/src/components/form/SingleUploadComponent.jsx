/* eslint-disable react/prop-types */
import { Camera, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/useFileUpload";

const SingleUploadComponent = ({ title, name, formik, loading }) => {
  const { singleFile } = useFileUpload(formik.setFieldValue, formik.values);
  return (
    <Button disabled={loading} className="relative w-full overflow-hidden">
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <div className="flex items-center gap-2">
          <Camera />
          <span>{title}</span>
        </div>
      )}
      <label
        htmlFor="file"
        className="absolute z-10 h-full w-full bg-transparent"
      >
        <input
          id="file"
          name={name}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={loading}
          onChange={singleFile}
        />
      </label>
    </Button>
  );
};

export default SingleUploadComponent;
