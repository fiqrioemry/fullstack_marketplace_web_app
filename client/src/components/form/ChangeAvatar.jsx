/* eslint-disable react/prop-types */
import { Camera, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/useFileUpload";

const ChangeAvatar = ({ form, action, loading }) => {
  const { singleFile } = useFileUpload(form.setFieldValue, form.values, action);

  return (
    <Button disabled={loading} className="relative overflow-hidden">
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <div>
            <Camera />
          </div>
          <span>Change Avatar</span>
        </>
      )}
      <label
        htmlFor="file"
        className="absolute z-10 h-full w-full bg-transparent"
      >
        <input
          id="file"
          name="avatar"
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

export default ChangeAvatar;
