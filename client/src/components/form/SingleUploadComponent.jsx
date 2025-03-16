/* eslint-disable react/prop-types */
import { useFileUpload } from "@/hooks/useFileUpload";
import { CloudUpload, X } from "lucide-react";

const SingleUploadComponent = ({ formik, value, placeholder, name, label }) => {
  const { singleFile, removePreview, handleDrop, handleDragOver } =
    useFileUpload(formik.setFieldValue, formik.values);

  return (
    <div className="mb-6">
      {value.length !== 0 || value !== "" ? (
        <div>
          <div className="relative aspect-square">
            <button
              type="button"
              name={name}
              onClick={() => removePreview(name)}
              className="bg-primary text-background rounded-full p-2 absolute -top-2 -right-2"
            >
              <X size={14} />
            </button>
            <div className="rounded-md overflow-hidden">
              {value instanceof File || value instanceof Blob ? (
                <img
                  src={URL.createObjectURL(value)}
                  className="w-full border object-cover aspect-square"
                />
              ) : (
                <img
                  src={value}
                  alt={name}
                  className="w-full border object-cover aspect-square"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <label
          className="aspect-video flex items-center justify-center border rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          htmlFor={label}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, name)}
        >
          <div className="flex items-center flex-col">
            <CloudUpload size={24} />
            <span>{placeholder}</span>
          </div>
          <input
            multiple
            id={label}
            type="file"
            name={name}
            accept="image/*"
            className="hidden"
            onChange={singleFile}
          />
        </label>
      )}
    </div>
  );
};

export default SingleUploadComponent;
