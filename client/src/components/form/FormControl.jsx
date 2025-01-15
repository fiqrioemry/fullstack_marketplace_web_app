/* eslint-disable react/prop-types */
import { Fragment, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProductStore } from "../../store/useProductStore";

function FormControls({ formControls = [], formData, disabled, handleChange }) {
  const { getCities, getCategories, cities, categories } = useProductStore();

  useEffect(() => {
    formControls.forEach((control) => {
      if (control.label === "city") {
        getCities();
      }
      if (control.label === "category") {
        getCategories();
      }
    });
  }, [getCategories, getCities, formControls]);

  function renderComponentByType(control) {
    let element = null;
    const options =
      control.label === "city"
        ? cities
        : control.label === "category"
        ? categories
        : control.options || [];
    const currentValue = formData[control.name] || "";

    switch (control.componentType) {
      case "input":
        element = (
          <>
            <Label htmlFor={control.name}>{control.label}</Label>
            <Input
              id={control.name}
              name={control.name}
              type={control.type}
              disabled={disabled}
              value={currentValue}
              onChange={handleChange}
              maxLength={control.maxLength}
              placeholder={control.placeholder}
              required
            />
          </>
        );
        break;
      case "checkbox":
        element =
          control.method === "multiple" ? (
            <Fragment>
              {options.map((option) => (
                <div
                  className="flex items-center space-x-3 py-2 px-3"
                  key={option.id}
                >
                  <input
                    id={option.id}
                    type={control.type}
                    name={control.name}
                    value={option.id}
                    onChange={handleChange}
                    checked={currentValue.includes(String(option.id))}
                  />
                  <Label htmlFor={option.id}>{option.name}</Label>
                </div>
              ))}
            </Fragment>
          ) : (
            <div
              className="flex items-center space-x-3 py-2 px-3"
              key={control.name}
            >
              <input
                id={control.name}
                name={control.name}
                type={control.type}
                checked={currentValue}
                onChange={handleChange}
                className="w-6 h-6"
              />
              <Label htmlFor={control.name}>{control.label}</Label>
            </div>
          );
        break;

      case "select":
        element = (
          <div className="flex flex-col">
            <Label htmlFor={control.name}>{control.label}</Label>
            <select
              id={control.label}
              name={control.name}
              value={currentValue}
              onChange={handleChange}
              disabled={disabled}
              className="rounded-md border border-input px-3 py-2"
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
      case "textarea":
        element = (
          <Fragment>
            <Label htmlFor={control.name}>{control.label}</Label>
            <Textarea
              disabled={disabled}
              id={control.name}
              name={control.name}
              onChange={handleChange}
              value={currentValue}
              placeholder={control.placeholder}
              maxLength="200"
              className="resize-none"
            />
          </Fragment>
        );
        break;
      default:
        element = (
          <Fragment>
            <Label htmlFor={control.name}>{control.label}</Label>
            <Input
              id={control.name}
              name={control.name}
              type={control.type}
              onChange={handleChange}
              value={currentValue}
              placeholder={control.placeholder}
              disabled={disabled}
            />
          </Fragment>
        );
        break;
    }

    return element;
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((control) => (
        <div key={control.name}>{renderComponentByType(control)}</div>
      ))}
    </div>
  );
}

export default FormControls;
