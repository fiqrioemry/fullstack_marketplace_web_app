import { useEffect } from "react";
import { useFormik } from "formik";
import { newValidationSchema } from "@/lib/utils";

export const useFormSchema = (state, control, action, params) => {
  const formik = useFormik({
    initialValues: state,
    validationSchema: newValidationSchema(control),
    enableReinitialize: true,
    onSubmit: (values) => {
      action(values, params);
    },
  });

  useEffect(() => {
    formik.validateForm();

    formik.setTouched({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [control]);

  return formik;
};
