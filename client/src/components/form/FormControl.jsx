import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductStore } from "../../store/useProductStore";

function FormControls({ formControls = [], formData, handleChange }) {
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
        if (control.name === "city" && !cities.length) {
          getCities();
        }
        if (control.name === "category" && !categories.length) {
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
          <Input
            id={controlItem.name}
            name={controlItem.name}
            type={controlItem.type}
            value={currentControlItemValue}
            placeholder={controlItem.placeholder}
            onChange={handleChange}
          />
        );
        break;
      case "checkbox":
        element = (
          <>
            {isCitiesLoading || isCategoriesLoading ? (
              <SelectItem disabled>Loading...</SelectItem>
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
      case "select":
        element = (
          <Select
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
                  <SelectItem key={option.id} value={option.name}>
                    {option.name || option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
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
