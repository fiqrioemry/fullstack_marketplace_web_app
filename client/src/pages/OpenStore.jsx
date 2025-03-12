import { useShopStore } from "@/store/useShopStore";
import FormInput from "@/components/form/FormInput";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { openStoreControl, openStoreState } from "@/config";

const OpenStore = () => {
  const { createStore, loading } = useShopStore();
  const openStoreForm = useFormSchema(
    createStore,
    openStoreState,
    openStoreControl
  );

  return (
    <div className="container mx-auto ">
      <div className="flex justify-center py-3 md:py-6 px-2">
        <div className="w-full max-w-sm border rounded-lg p-4">
          <FormInput formik={openStoreForm} formControl={openStoreControl}>
            <InputButton
              loading={loading}
              title={"Create Store"}
              formik={openStoreForm}
            />
          </FormInput>
        </div>
      </div>
    </div>
  );
};

export default OpenStore;
