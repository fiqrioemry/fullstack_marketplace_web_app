import InputForm from "@/components/form/InputForm";
import InputButton from "@/components/form/InputButton";
import { useFormSchema } from "@/hooks/useFormSchema";
import { productControl, productState } from "@/config";
import { useShopStore } from "@/store/useShopStore";

const AddStoreProducts = () => {
  const { createProduct, loading } = useShopStore;
  const productForm = useFormSchema(
    productState,
    productControl,
    createProduct
  );

  return (
    <section className="space-y-6">
      <div className="rounded-md border">
        <InputForm formik={productForm} formControl={productControl}>
          <InputButton title="Submit" formik={productForm} loading={loading} />
        </InputForm>
      </div>
    </section>
  );
};

export default AddStoreProducts;
