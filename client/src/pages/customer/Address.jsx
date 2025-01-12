import { Plus } from "lucide-react";
import UserAddress from "../UserAddress";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { controlAddressForm, initialAddressForm } from "../../config";
import { useUserStore } from "../../store/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHandleForm } from "../../hooks/useHandleForm";
import NewAddress from "../../components/modal/NewAddress";
import { ModalContainer } from "../../components/modal/ModalContainer";
import UserAddressSkeleton from "../../components/loading/UserAddressSkeleton";

const Address = () => {
  const { formData, setFormData, handleChange } =
    useHandleForm(initialAddressForm);
  const { address, getUserAddress } = useUserStore();

  useEffect(() => {
    getUserAddress();
  }, [getUserAddress]);

  console.log(formData);
  return (
    <div className="space-y-4">
      {!address && <UserAddressSkeleton />}

      {address && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <div>
              <ModalContainer
                title={
                  <Button>
                    <Plus />
                    <span> Add new address</span>
                  </Button>
                }
              >
                <NewAddress
                  formData={formData}
                  formControls={controlAddressForm}
                  handleChange={handleChange}
                />
              </ModalContainer>
            </div>
          </div>
          {address.length !== 0 ? (
            <ScrollArea className="h-96 bg-muted p-4">
              <div className="space-y-4">
                {address.map((addr) => (
                  <UserAddress data={addr} key={addr.id} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="h-96  default_border flex items-center justify-center">
              <h4>You Dont Have an Address, Try to add one</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Address;
