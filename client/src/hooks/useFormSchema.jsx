import { useEffect } from "react";
import { useFormik } from "formik";
import { newValidationSchema } from "@/lib/utils";

export const useFormSchema = (state, control, action, params) => {
  const formik = useFormik({
    initialValues: state,
    validationSchema: newValidationSchema(control),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "images" && Array.isArray(values[key])) {
          values[key].forEach((file) => {
            formData.append("images", file);
          });
        } else {
          formData.append(key, values[key]);
        }
      });

      try {
        await action(formData, params);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  useEffect(() => {
    if (Object.keys(state).length) {
      formik.validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return formik;
};
