/* eslint-disable react/prop-types */
import { useFileUpload } from "@/hooks/useFileUpload";
import { CloudUpload, FilePlus, X } from "lucide-react";

const MultiUploadComponent = ({ formik, value, name, label }) => {
  const { multiFile, removePreview, handleDrop, handleDragOver } =
    useFileUpload(formik.setFieldValue, formik.values);

  return (
    <div className="mb-6">
      {Array.isArray(value) && value.length > 0 ? (
        <div className="grid-display-5">
          {value.map((image, index) => (
            <div className="relative aspect-square" key={index}>
              <button
                type="button"
                name={name}
                onClick={() => removePreview(name, index)}
                className="bg-primary text-background rounded-full p-2 absolute -top-2 -right-2"
              >
                <X size={14} />
              </button>
              <div className="rounded-md overflow-hidden">
                {image instanceof File || image instanceof Blob ? (
                  <img
                    src={URL.createObjectURL(image)}
                    className="w-full border object-cover aspect-square"
                  />
                ) : (
                  <img
                    src={image}
                    alt={`image-${index}`}
                    className="w-full border object-cover aspect-square"
                  />
                )}
              </div>
            </div>
          ))}

          {value.length < 5 && (
            <label
              htmlFor={label}
              className="relative aspect-square flex items-center justify-center border bg-gray-100  hover:bg-gray-200  border-dashed rounded-lg transition-colors"
            >
              <FilePlus size={20} />
              <input
                id={label}
                multiple
                type="file"
                name={name}
                accept="image/*"
                className="hidden"
                onChange={multiFile}
              />
            </label>
          )}
        </div>
      ) : (
        <label
          className="aspect-video flex items-center justify-center border  rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          htmlFor={label}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, name)}
        >
          <div className="flex items-center flex-col">
            <CloudUpload size={24} />
            <span>Select product image</span>
          </div>
          <input
            multiple
            id={label}
            type="file"
            name={name}
            accept="image/*"
            className="hidden"
            onChange={multiFile}
          />
        </label>
      )}
    </div>
  );
};

export default MultiUploadComponent;
