import { useEffect } from "react";
import { formatFormDataDates } from "@/lib/utils";

export const useSetFormData = (data, formik) => {
  useEffect(() => {
    const dateFields = [];

    if (data?.birthday) {
      dateFields.push("birthday");
    }

    const formattedDates = formatFormDataDates(data, dateFields);

    formik.setValues({
      ...data,
      ...formattedDates,
    });
  }, [data]);
};
