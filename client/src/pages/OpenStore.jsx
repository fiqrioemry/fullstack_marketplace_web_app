import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useHandleForm } from "@/hooks/useHandleForm";
import OpenStoreForm from "../components/form/OpenStoreFrom";
import { ControlOpenStoreForm, initialOpenStoreForm } from "../config";

const OpenStore = () => {
  const { userOpenStore, isAuthLoading } = useAuthStore();
  const { formData, handleChange, handleValidate, handleSubmit } =
    useHandleForm(initialOpenStoreForm);

  const isValid = handleValidate();

  const handleOpenStore = (e) => handleSubmit(e, userOpenStore(formData));

  return (
    <div className="grid min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-xs p-4">
            <OpenStoreForm
              isValid={isValid}
              formData={formData}
              onSubmit={handleOpenStore}
              isLoading={isAuthLoading}
              submitTitle={"Open store"}
              handleChange={handleChange}
              controlForm={ControlOpenStoreForm}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OpenStore;
