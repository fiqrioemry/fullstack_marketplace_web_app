import InputForm from "@/components/form/InputForm";
import { useShopStore } from "@/store/useShopStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { productControl, productState } from "@/config";

const ProductsAdd = () => {
  const { createProduct, loading } = useShopStore();
  const productForm = useFormSchema(
    createProduct,
    productState,
    productControl
  );

  return (
    <section className="space-y-6">
      <div className="rounded-md border p-4">
        <InputForm
          formik={productForm}
          formControl={productControl}
          inputStyle={"h-40"}
        >
          <InputButton title="Submit" formik={productForm} loading={loading} />
        </InputForm>
      </div>
    </section>
  );
};

export default ProductsAdd;
