/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFileUpload } from "@/hooks/useFileUpload";
import { CloudUpload, FilePlus, X } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import InputLabel from "./InputLabel";

function FormInput({ formik, formControl, children }) {
  const { getCategories, categories } = useProductStore();

  const { singleFile, multiFile, removePreview, handleDrop, handleDragOver } =
    useFileUpload(formik.setFieldValue, formik.values);

  useEffect(() => {
    formControl.forEach((control) => {
      if (control.label === "category") {
        getCategories();
      }
    });
  }, []);

  function renderComponentByType(control) {
    const { label, name, type, placeholder, disabled, option } = control;
    const value = formik.values[name];
    const handleBlur = formik.handleBlur;
    const handleChange = formik.handleChange;
    const options = label === "category" ? categories : option || [];

    switch (control.component) {
      case "upload":
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

      case "input":
        return (
          <>
            <InputLabel formik={formik} name={name} label={label} />
            <Input
              id={label}
              name={name}
              type={type}
              value={value}
              disabled={disabled}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={placeholder}
            />
          </>
        );

      case "multiple-checked":
        return (
          <div>
            {options.map((option) => {
              const selectedValues = value || [];
              return (
                <div
                  className="flex items-center space-x-3 py-2 px-3"
                  key={option.id}
                >
                  <input
                    id={option.id}
                    type="checkbox"
                    name={name}
                    value={option.name}
                    onBlur={handleBlur}
                    onChange={() => {
                      let newValues = [...selectedValues];
                      if (newValues.includes(option.name)) {
                        newValues = newValues.filter(
                          (val) => val !== option.name
                        );
                      } else {
                        newValues.push(option.name);
                      }
                      formik.setFieldValue(name, newValues);
                    }}
                    checked={selectedValues.includes(option.name)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor={option.id}>{option.name}</Label>
                </div>
              );
            })}
          </div>
        );

      case "single-checked":
        return (
          <>
            <div className="flex items-center gap-2">
              <input
                id={label}
                name={name}
                type="checkbox"
                onBlur={handleBlur}
                checked={value}
                className="w-5 h-5"
                onChange={(e) => formik.setFieldValue(name, e.target.checked)}
              />
              <label htmlFor={label}>{label}</label>
            </div>
          </>
        );

      case "select":
        return (
          <div>
            <InputLabel formik={formik} name={name} label={label} />
            <select
              id={label}
              name={name}
              type={type}
              value={value}
              onBlur={handleBlur}
              disabled={disabled}
              onChange={handleChange}
              placeholder={placeholder}
              className="px-2 py-2 w-full"
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option value={option?.id || option} key={option?.id || option}>
                  {option?.name || option}
                </option>
              ))}
            </select>
          </div>
        );

      case "filter":
        <>
          <InputLabel formik={formik} name={name} label={label} />
          <select
            id={label}
            name={name}
            type={type}
            value={value}
            onBlur={handleBlur}
            disabled={disabled}
            onChange={handleChange}
            placeholder={placeholder}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {control.options.map((option) => (
              <option value={option?.id || option} key={option?.id || option}>
                {option?.name || option}
              </option>
            ))}
          </select>
        </>;
        break;
      case "textarea":
        <>
          <InputLabel formik={formik} name={name} label={label} />
          <Textarea
            id={name}
            name={name}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            maxLength="400"
            className="resize-none h-60"
          />
        </>;
        break;
      case "date":
        <div className="mb-4">
          <InputLabel formik={formik} name={name} label={label} />
          <Input
            id={label}
            type={type}
            name={name}
            onBlur={handleBlur}
            value={value ? "" : ""}
            onChange={(e) => {
              formik.setFieldValue(name, e.target.value);
            }}
            placeholder={placeholder}
          />
        </div>;
        break;
      default:
        <>
          <Input
            id={label}
            name={name}
            type={type}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={control.disabled}
          />
        </>;
        break;
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {formControl.map((control) => (
        <div key={control.label}>{renderComponentByType(control)}</div>
      ))}
      <div>{children}</div>
    </form>
  );
}

export default FormInput;
