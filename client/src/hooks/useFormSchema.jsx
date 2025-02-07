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
    if (Object.keys(state).length) {
      formik.validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return formik;
};

// import { useEffect } from "react";
// import { useFormik } from "formik";
// import { newValidationSchema } from "@/lib/utils";

// export const useFormSchema = (state, control, action, params) => {
//   const formik = useFormik({
//     initialValues: state,
//     validationSchema: newValidationSchema(control),
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       const formData = new FormData();

//       Object.keys(values).forEach((key) => {
//         if (key === "files" && Array.isArray(values[key])) {
//           values[key].forEach((file) => {
//             formData.append("files", file);
//           });
//         } else {
//           formData.append(key, values[key]);
//         }
//       });
//       console.log(formData);
//       action(formData, params);
//     },
//   });

//   useEffect(() => {
//     if (Object.keys(state).length) {
//       formik.validateForm();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return formik;
// };
