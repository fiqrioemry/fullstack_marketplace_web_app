import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import FormInput from "@/components/form/FormInput";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { openStoreControl as control, openStoreState as state } from "@/config";

const OpenStore = () => {
  const { createStore, loading } = useAuthStore();
  const openStoreForm = useFormSchema(state, control, createStore);

  return (
    <div className="grid min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-xs p-4">
            <FormInput formik={openStoreForm} formControl={control}>
              <InputButton
                loading={loading}
                title={"Create Store"}
                formik={openStoreForm}
              />
            </FormInput>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OpenStore;
