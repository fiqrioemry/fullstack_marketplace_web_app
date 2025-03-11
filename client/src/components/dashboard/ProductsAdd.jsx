import FormInput from "@/components/form/FormInput";
import { useShopStore } from "@/store/useShopStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { productControl, productState } from "@/config";

const ProductsAdd = () => {
  const { createProduct, loading } = useShopStore();
  const productForm = useFormSchema(createProduct, productState);

  return (
    <section className="space-y-6">
      <div className="rounded-md border p-4">
        <FormInput
          formik={productForm}
          inputStyle={"h-40"}
          formControl={productControl}
        >
          <InputButton title="Submit" formik={productForm} loading={loading} />
        </FormInput>
      </div>
    </section>
  );
};

export default ProductsAdd;
