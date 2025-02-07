import InputForm from "@/components/form/InputForm";
import { useShopStore } from "@/store/useShopStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { productControl, productState } from "@/config";

const AddStoreProducts = () => {
  const { createProduct, loading } = useShopStore();
  const productForm = useFormSchema(
    productState,
    productControl,
    createProduct
  );

  return (
    <section className="space-y-6">
      <div className="rounded-md border p-4">
        <InputForm formik={productForm} formControl={productControl}>
          <InputButton title="Submit" formik={productForm} loading={loading} />
        </InputForm>
      </div>
    </section>
  );
};

export default AddStoreProducts;
