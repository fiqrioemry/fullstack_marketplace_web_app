/* eslint-disable react/prop-types */
import { useEffect } from "react";
import InputLabel from "./InputLabel";
import DateComponent from "./DateComponent";
import { Input } from "@/components/ui/input";
import SelectComponent from "./SelectComponent";
import { Textarea } from "@/components/ui/textarea";
import { useProductStore } from "@/store/useProductStore";
import InputNumberComponent from "./InputNumberComponent";
import MultiUploadComponent from "./MultiUploadComponent";
import SingleUploadComponent from "./SingleUploadComponent";
import SingleCheckedComponent from "./SingleCheckedComponent";
import MultipleCheckedComponent from "./MultipleCheckedComponent";

function FormInput({ formik, formControl, disabled, children }) {
  const { getCategories, categories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (!categories) return null;

  function renderComponentByType(control) {
    let { label, name, type, placeholder, maxLength, options } = control;
    const value = formik.values[name];
    const handleBlur = formik.handleBlur;
    const handleChange = formik.handleChange;
    options = name === "category" ? categories : options;

    switch (control.component) {
      case "multi-upload":
        return (
          <MultiUploadComponent
            name={name}
            label={label}
            value={value}
            formik={formik}
          />
        );

      case "single-upload":
        return (
          <SingleUploadComponent
            name={name}
            label={label}
            value={value}
            formik={formik}
            placeholder={placeholder}
          />
        );

      case "input-text":
        return (
          <>
            {label && <InputLabel formik={formik} name={name} label={label} />}

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

      case "input-number":
        return (
          <InputNumberComponent
            label={label}
            name={name}
            type={type}
            value={value}
            formik={formik}
            disabled={disabled}
            onBlur={handleChange}
            maxLength={maxLength}
            placeholder={placeholder}
          />
        );

      case "multiple-checked":
        return (
          <MultipleCheckedComponent
            name={name}
            type={type}
            label={label}
            value={value}
            formik={formik}
            options={options}
            disabled={disabled}
          />
        );

      case "single-checked":
        return (
          <SingleCheckedComponent
            name={name}
            type={type}
            label={label}
            value={value}
            formik={formik}
            disabled={disabled}
          />
        );

      case "select":
        return (
          <SelectComponent
            name={name}
            type={type}
            label={label}
            value={value}
            formik={formik}
            disabled={disabled}
            options={options}
            placeholder={placeholder}
            handleChange={handleChange}
          />
        );
      case "textarea":
        return (
          <>
            <InputLabel formik={formik} name={name} label={label} />
            <Textarea
              id={label}
              name={name}
              value={value}
              maxLength={maxLength}
              disabled={disabled}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={placeholder}
              className="resize-none h-60"
            />
          </>
        );
      case "date":
        return (
          <DateComponent
            name={name}
            label={label}
            value={value}
            formik={formik}
            placeholder={placeholder}
            handleChange={handleChange}
          />
        );
      default:
        return (
          <>
            <Input
              id={label}
              name={name}
              type={type}
              value={value}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={disabled}
              placeholder={placeholder}
            />
          </>
        );
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
