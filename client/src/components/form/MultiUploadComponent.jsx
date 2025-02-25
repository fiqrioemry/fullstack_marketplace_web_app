/* eslint-disable react/prop-types */
import { useFileUpload } from "@/hooks/useFileUpload";
import { CloudUpload, FilePlus, X } from "lucide-react";

const MultiUploadComponent = ({ formik, value, name, label, type }) => {
  const { multiFile, removePreview, handleDrop, handleDragOver } =
    useFileUpload(formik.setFieldValue, formik.values);

  return (
    <div className="min-h-svh flex items-center justify-center bg-red-500">
      {Array.isArray(value) && value.length !== 0 ? (
        <div className="grid-display-5">
          {value.map((image, index) => (
            <div className="relative" key={index}>
              <button
                type="button"
                name={name}
                className="remove_preview_btn"
                onClick={() => removePreview(name, index)}
              >
                <X size={14} />
              </button>
              <div className="rounded-md overflow-hidden">
                {image instanceof File || image instanceof Blob ? (
                  <img
                    src={URL.createObjectURL(image)}
                    className="w-full h-full object-cover"
                    onLoad={(e) => {
                      if (e.target.src.startsWith("blob:")) {
                        URL.revokeObjectURL(e.target.src);
                      }
                    }}
                  />
                ) : (
                  <img
                    src={image}
                    alt={`image-${index}`}
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          ))}

          {value.length < 5 && (
            <div className="">
              <label htmlFor={label} className="">
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
            </div>
          )}
        </div>
      ) : (
        <label
          className=""
          htmlFor={label}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, name)}
        >
          <div className="flex_center">
            <CloudUpload size={24} />
            <span>Pilih </span>
          </div>
          <input
            multiple
            id={label}
            type={type}
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
