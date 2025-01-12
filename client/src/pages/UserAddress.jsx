import { Button } from "@/components/ui/button";

const UserAddress = ({ addr }) => {
  return (
    <div className="bg-background rounded-md shadow-md space-y-2 p-4">
      <h4 className="text-foreground/50">Shipment Address</h4>
      <div className="flex items-center gap-2">
        <span>Home -</span>
        <span>Ahmad Fiqri Oemry</span>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        similique aliquam hic, atque nemo iusto explicabo, doloribus et, ipsum
        esse illo? Vero eaque architecto quae.
      </div>
      <div className="space-x-4">
        <Button>Edit Address</Button>
        {/* <Button>Add Address</Button>
        <Button>Change Address</Button> */}
        <Button>Select as main</Button>
      </div>
    </div>
  );
};

export default UserAddress;
