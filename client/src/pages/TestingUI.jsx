import InputForm from "@/components/form/InputForm";
import { useFormSchema } from "@/hooks/useFormSchema";

const state = {
  files: "",
};

const control = [
  {
    name: "files",
    label: "file",
    placeholder: "Maksimum 5 Images and less than 1mb each",
    component: "upload",
  },
];

const TestingUI = () => {
  const formik = useFormSchema(state, control, null);
  console.log(formik.values);
  return (
    <div className="h-96">
      <InputForm formik={formik} formControl={control} />
    </div>
  );
};

export default TestingUI;
