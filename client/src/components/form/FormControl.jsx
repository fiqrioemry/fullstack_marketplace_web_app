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
              onChange={handleChange}
              name={controlItem.name}
              type={controlItem.type}
              value={currentControlItemValue}
              maxlength={controlItem.maxlength}
              placeholder={controlItem.placeholder}
              disabled={disabled}
              required
            />
          </>
        );
        break;
      case "checkbox":
        element = (
          <>
            {options.map((option) => (
              <div
                className="flex items-center space-x-3 py-2 px-3"
                key={option.id}
              >
                <input
                  id={controlItem.name}
                  type={controlItem.type}
                  name={controlItem.name}
                  value={option.name}
                  onChange={handleChange}
                  checked={currentControlItemValue.includes(option.name)}
                />
                <Label
                  htmlFor={controlItem.name}
                  className="text-sm font-medium"
                >
                  {option.name}
                </Label>
              </div>
            ))}
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
          <>
            <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
            <Textarea
              disabled={disabled}
              id={controlItem.name}
              name={controlItem.name}
              onChange={handleChange}
              value={currentControlItemValue}
              placeholder={controlItem.placeholder}
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
