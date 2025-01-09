import UserAddress from "../UserAddress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { ModalContainer } from "../../components/modal/ModalContainer";
import NewAddress from "../../components/modal/NewAddress";
const Address = () => {
  return (
    <section className="space-y-6">
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
            <NewAddress />
          </ModalContainer>
        </div>
      </div>

      <ScrollArea className="h-96 bg-muted p-4">
        <div className="space-y-4">
          <UserAddress />
          <UserAddress />
          <UserAddress />
          <UserAddress />
          <UserAddress />
          <UserAddress />
        </div>
      </ScrollArea>
    </section>
  );
};

export default Address;
