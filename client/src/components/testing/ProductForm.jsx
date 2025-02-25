import InputButton from "../form/InputButton";
import FormInput from "@/components/form/FormInput";
import { testControl, testState } from "../../config";
import { useFormSchema } from "../../hooks/useFormSchema";
import { useProductStore } from "../../store/useProductStore";

const ProductForm = () => {
  const { createProduct } = useProductStore();
  const productForm = useFormSchema(testState, testControl, createProduct);

  return (
    <div className="max-w-5xl p-4">
      <FormInput formik={productForm} formControl={testControl}>
        <InputButton formik={productForm} title="submit" />
      </FormInput>
    </div>
  );
};

export default ProductForm;
