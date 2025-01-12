import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProductStore } from "../../store/useProductStore";

function FormControls({ formControls = [], formData, disabled, handleChange }) {
  const {
    getCities,
    getCategories,
    cities,
    categories,
    isCitiesLoading,
    isCategoriesLoading,
  } = useProductStore();

  useEffect(() => {
    formControls.forEach((control) => {
      if (control.componentType === "select") {
        if (control.name === "city" && cities.length === 0) {
          getCities();
        }
        if (control.name === "category" && categories.length === 0) {
          getCategories();
        }
      }
    });
  }, [formControls, getCities, getCategories, cities, categories]);

  function renderComponentByType(controlItem) {
    let element = null;
    const currentControlItemValue = formData[controlItem.name] || "";
    const options =
      controlItem.name === "city"
        ? cities
        : controlItem.name === "category"
        ? categories
        : controlItem.options || [];

    switch (controlItem.componentType) {
      case "input":
        element = (
          <>
            <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
            <Input
              id={controlItem.name}
              name={controlItem.name}
              type={controlItem.type}
              value={currentControlItemValue}
              disabled={disabled}
              placeholder={controlItem.placeholder}
              onChange={handleChange}
              maxlength={controlItem.maxlength}
              required
            />
          </>
        );
        break;
      case "checkbox":
        element = (
          <>
            {options.length === 0 ? (
              <div className="px-3">Loading...</div>
            ) : (
              options.map((option) => (
                <div
                  className="flex items-center space-x-3 py-2 px-3"
                  key={option.id}
                >
                  <input
                    id={controlItem.name}
                    name={controlItem.name}
                    type={controlItem.type}
                    value={option.name}
                    checked={currentControlItemValue.includes(option.name)}
                    onChange={handleChange}
                  />
                  <Label
                    htmlFor={controlItem.name}
                    className="text-sm font-medium"
                  >
                    {option.name}
                  </Label>
                </div>
              ))
            )}
          </>
        );
        break;
      case "binary":
        element = (
          <>
            <div
              className="flex items-center space-x-3 py-2 px-3"
              key={controlItem.name}
            >
              <input
                id={controlItem.name}
                name={controlItem.name}
                type={controlItem.type}
                checked={currentControlItemValue}
                onChange={handleChange}
              />
              <Label htmlFor={controlItem.name} className="text-sm font-medium">
                {controlItem.label}
              </Label>
            </div>
          </>
        );
        break;
      case "select":
        element = (
          <>
            <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
            <Select
              disabled={disabled}
              onValueChange={(value) =>
                handleChange({ target: { name: controlItem.name, value } })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={controlItem.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {isCitiesLoading || isCategoriesLoading ? (
                  <SelectItem disabled>Loading...</SelectItem>
                ) : (
                  options.map((option) => (
                    <SelectItem
                      key={option.id || option}
                      value={option.name || option}
                    >
                      {option.name || option}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </>
        );
        break;
      case "textarea":
        element = (
          <>
            <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
            <Textarea
              id={controlItem.name}
              name={controlItem.name}
              placeholder={controlItem.placeholder}
              value={currentControlItemValue}
              onChange={handleChange}
              disabled={disabled}
              maxlength="200"
              className="resize-none"
            />
          </>
        );
        break;
      default:
        element = (
          <>
            <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
            <Input
              id={controlItem.name}
              name={controlItem.name}
              placeholder={controlItem.placeholder}
              type={controlItem.type}
              value={currentControlItemValue}
              onChange={handleChange}
              disabled={disabled}
            />
          </>
        );
        break;
    }

    return element;
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem) => (
        <div key={controlItem.name}>{renderComponentByType(controlItem)}</div>
      ))}
    </div>
  );
}

export default FormControls;
