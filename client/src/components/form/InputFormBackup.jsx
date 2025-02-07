/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProductStore } from "@/store/useProductStore";
import { useFileUpload } from "../../hooks/useFileUpload";
import { CloudUpload, FilePlus, X } from "lucide-react";

function InputForm({
  formControl,
  formik,
  formStyle,
  inputStyle,
  disabled = false,
  children,
}) {
  const { getCities, getCategories, cities, categories } = useProductStore();

  const { multiUpload, preview, removePreview, handleDragOver, handleDrop } =
    useFileUpload(formik.setFieldValue, formik.values);

  useEffect(() => {
    formControl.forEach((control) => {
      if (control.label === "city") {
        getCities();
      }
      if (control.label === "category") {
        getCategories();
      }
    });
  }, []);

  function renderComponentByType(control) {
    let element = null;

    const options =
      control.label === "city"
        ? cities
        : control.label === "category"
        ? categories
        : control.options || [];

    switch (control.component) {
      case "input":
        element = (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Label htmlFor={control.label} className="label_input">
                {control.label}
              </Label>
              {formik.touched[control.name] && formik.errors[control.name] && (
                <p className="text-red-500 text-xs">
                  {formik.errors[control.name]}
                </p>
              )}
            </div>
            <Input
              id={control.label}
              name={control.name}
              type={control.type}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={control.placeholder}
              value={formik.values[control.name]}
              disabled={control.disabled || disabled}
              className="mt-1 block w-full"
            />
          </div>
        );
        break;

      case "upload":
        element = (
          <div>
            {preview && preview.length !== 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {preview.map((view, index) => (
                  <div
                    className="relative h-40 border rounded-md w-full"
                    key={index}
                  >
                    <button
                      onClick={() => removePreview(index)}
                      className="bg-primary text-background rounded-full p-2 absolute -top-2 -right-2"
                    >
                      <X size={14} />
                    </button>

                    <img
                      src={view.url}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                ))}
                {preview.length < 5 && (
                  <div className="h-40 w-full">
                    <label
                      htmlFor={control.label}
                      className="h-full z-50 flex items-center justify-center default_border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted duration-300"
                    >
                      <FilePlus size={20} />
                      <input
                        id={control.label}
                        required
                        multiple
                        type="file"
                        name={control.name}
                        accept="image/*"
                        className="hidden"
                        onChange={multiUpload}
                      />
                    </label>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <label
                  htmlFor={control.label}
                  className="col-span-5 h-72 md:h-96 flex items-center justify-center default_border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted duration-300"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="flex flex-col justify-center items-center">
                    <CloudUpload size={24} />
                    <div className="text-center text-sm">
                      <span>{control.placeholder}</span>
                    </div>
                  </div>
                  <input
                    id={control.label}
                    required
                    multiple
                    type="file"
                    name={control.name}
                    accept="image/*"
                    className="hidden"
                    onChange={multiUpload}
                  />
                </label>
              </div>
            )}
          </div>
        );
        break;

      case "checkbox-multiple":
        return (
          <div>
            {options.map((option) => {
              const selectedValues = formik.values[control.name] || [];
              return (
                <div
                  className="flex items-center space-x-3 py-2 px-3"
                  key={option.id}
                >
                  <input
                    id={option.id}
                    type="checkbox"
                    name={control.name}
                    value={option.name}
                    onBlur={formik.handleBlur}
                    onChange={() => {
                      let newValues = [...selectedValues];
                      if (newValues.includes(option.name)) {
                        newValues = newValues.filter(
                          (val) => val !== option.name
                        );
                      } else {
                        newValues.push(option.name);
                      }
                      formik.setFieldValue(control.name, newValues);
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

      case "checkbox-single":
        return (
          <div
            className="flex items-center space-x-3 py-2 px-3"
            key={control.name}
          >
            <input
              id={control.label}
              name={control.name}
              type="checkbox"
              onBlur={formik.handleBlur}
              onChange={(e) =>
                formik.setFieldValue(control.name, e.target.checked)
              }
              checked={formik.values[control.name]}
              className="w-5 h-5"
            />
            <Label htmlFor={control.name}>{control.label}</Label>
          </div>
        );

      case "select":
        element = (
          <div className="flex flex-col space-y-1 mb-2">
            <div className="flex items-center space-x-2 h-5">
              <Label htmlFor={control.label} className="label_input">
                {control.label}
              </Label>
              {formik.touched[control.name] && formik.errors[control.name] && (
                <p className="text-red-500 text-xs">
                  {formik.errors[control.name]}
                </p>
              )}
            </div>
            <select
              id={control.label}
              name={control.name}
              type={control.type}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={control.placeholder}
              value={formik.values[control.name]}
              disabled={control.disabled || disabled}
              className="rounded-md border border-input px-3 py-2 text-sm"
            >
              <option value="" disabled>
                {control.placeholder}
              </option>
              {options.map((option) => (
                <option value={option?.id || option} key={option?.id || option}>
                  {option?.name || option}
                </option>
              ))}
            </select>
          </div>
        );
        break;

      case "filter":
        element = (
          <select
            id={control.label}
            name={control.name}
            type={control.type}
            onBlur={formik.handleBlur}
            placeholder={control.placeholder}
            onChange={formik.handleChange}
            value={formik.values[control.name]}
            disabled={control.disabled || disabled}
            className="rounded-md border border-input px-3 py-2 text-sm w-full"
          >
            <option value="" disabled>
              {control.placeholder}
            </option>
            {control.options.map((option) => (
              <option value={option?.id || option} key={option?.id || option}>
                {option?.name || option}
              </option>
            ))}
          </select>
        );
        break;
      case "textarea":
        element = (
          <>
            <div className="flex items-center space-x-2 mb-2">
              <Label htmlFor={control.label} className="label_input">
                {control.label}
              </Label>
              {formik.touched[control.name] && formik.errors[control.name] && (
                <p className="text-red-500 text-xs">
                  {formik.errors[control.name]}
                </p>
              )}
            </div>
            <Textarea
              id={control.name}
              name={control.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values[control.name]}
              placeholder={control.placeholder}
              disabled={control.disabled || disabled}
              maxLength="400"
              className="resize-none h-60"
            />
          </>
        );
        break;
      case "date":
        element = (
          <div className="mb-4">
            <Label htmlFor={control.label} className="label_input">
              {control.label}
            </Label>
            <Input
              id={control.label}
              name={control.name}
              type="date"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.setFieldValue(control.name, e.target.value);
              }}
              placeholder={control.placeholder}
              value={formik.values[control.name] ? "" : ""}
              className="mt-1 block w-full"
            />
            {formik.touched[control.name] && formik.errors[control.name] && (
              <p className="text-red-500 text-xs">
                {formik.errors[control.name]}
              </p>
            )}
          </div>
        );
        break;
      default:
        element = (
          <>
            <div className="flex items-center space-x-2 mb-2">
              <Label htmlFor={control.label} className="label_input">
                {control.label}
              </Label>
              {formik.touched[control.name] && formik.errors[control.name] && (
                <p className="text-red-500 text-xs">
                  {formik.errors[control.name]}
                </p>
              )}
            </div>

            <Input
              id={control.label}
              name={control.name}
              type={control.type}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={control.placeholder}
              value={formik.values[control.name]}
              className="mt-1 block w-full"
              disabled={control.disabled || disabled}
            />
          </>
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={formik.handleSubmit} className={`space-y-4 ${formStyle}`}>
      {formControl.map((control) => (
        <div key={control.name} className={inputStyle}>
          {renderComponentByType(control)}
        </div>
      ))}
      <div>{children}</div>
    </form>
  );
}

export default InputForm;
