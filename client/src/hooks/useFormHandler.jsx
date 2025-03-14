import { useForm } from "react-hook-form";
import { useEffect } from "react";

/**
 * Custom Hook untuk Form dengan React Hook Form
 * @param {Function} action - Fungsi yang akan dipanggil saat submit form.
 * @param {Object} state - Default values untuk form.
 * @param {Array} control - Konfigurasi field input.
 * @param {Object} params - Parameter tambahan untuk action.
 * @param {Boolean} resetOnSubmit - Apakah form akan di-reset setelah submit.
 */
export const useFormHandler = (
  action,
  state,
  control,
  params,
  resetOnSubmit = false
) => {
  const form = useForm({
    defaultValues: state,
  });

  const { handleSubmit, reset } = form;

  const onSubmit = async (data) => {
    try {
      await action(data, params);
      if (resetOnSubmit) {
        reset(); // Reset form jika diperlukan
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    form.reset(state); // Reset form ketika state berubah
  }, [state, form]);

  return { form, handleSubmit: handleSubmit(onSubmit) };
};
