/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fragment, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProductStore } from "../../store/useProductStore";

function FormControls({ formControls = [], formData, disabled, handleChange }) {
  const { getCities, getCategories, cities, categories } = useProductStore();

  useEffect(() => {
    formControls.forEach((control) => {
      if (control.name === "city" && !cities) {
        getCities();
      }
      if (control.name === "category" && !categories) {
        getCategories();
      }
    });
  }, [formControls, getCities, getCategories, cities, categories]);

  function renderComponentByType(control) {
    let element = null;
    const options =
      control.name === "city"
        ? cities
        : control.name === "category"
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
              onChange={handleChange}
              name={control.name}
              type={control.type}
              value={currentValue}
              maxlength={control.maxlength}
              placeholder={control.placeholder}
              disabled={disabled}
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
                    id={`${control.name}-${option.id}`}
                    type={control.type}
                    name={control.name}
                    value={option.name}
                    onChange={handleChange}
                    checked={currentValue.includes(option.name)}
                  />
                  <Label
                    htmlFor={`${control.name}-${option.id}`}
                    className="text-sm font-medium"
                  >
                    {option.name}
                  </Label>
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
              />
              <Label htmlFor={control.name} className="text-sm font-medium">
                {control.label}
              </Label>
            </div>
          );
        break;

      case "select":
        element = (
          <>
            <Label htmlFor={control.name}>{control.label}</Label>
            <Select
              disabled={disabled}
              onValueChange={(value) =>
                handleChange({ target: { name: control.name, value } })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={control.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.name}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
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
              maxlength="200"
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
