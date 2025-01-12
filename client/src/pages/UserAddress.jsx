/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

const UserAddress = ({ data, formData }) => {
  console.log(data);
  return (
    <div className="bg-background rounded-md shadow-md space-y-2 p-4">
      <h4 className="text-foreground/50">Address</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <span className="capitalize font-semibold">{data.name}</span>
          {data.isMain && (
            <span className="text-xs py-[0.5px] px-4 text-background bg-primary default_border">
              main
            </span>
          )}
        </div>
        <div>{data.phone}</div>
      </div>
      <p className="capitalize">
        {data.address}, {data.province}, {data.city}, {data.zipcode}
      </p>
      <div className="space-x-4">
        <Button>Edit Address</Button>

        {!data.isMain && <Button>Select as main</Button>}
      </div>
    </div>
  );
};

export default UserAddress;
