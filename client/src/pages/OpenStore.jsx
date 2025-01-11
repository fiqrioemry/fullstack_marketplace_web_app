import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useHandleForm } from "@/hooks/useHandleForm";
import OpenStoreForm from "../components/form/OpenStoreFrom";
import { ControlOpenStoreForm, initialOpenStoreForm } from "../config";

const OpenStore = () => {
  const navigate = useNavigate();
  const { userOpenStore, isAuthLoading } = useAuthStore();
  const { formData, handleChange, handleValidate } =
    useHandleForm(initialOpenStoreForm);
  console.log(formData);
  const isValid = handleValidate();

  const onSubmit = () => userOpenStore(formData, navigate);

  return (
    <div className="grid min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-xs p-4">
            <OpenStoreForm
              isValid={isValid}
              formData={formData}
              onSubmit={onSubmit}
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
