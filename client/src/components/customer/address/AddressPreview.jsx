/* eslint-disable react/prop-types */
import UpdateAddress from "./UpdateAddress";
import DeleteAddress from "./DeleteAddress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const AddressPreview = ({ address }) => {
  if (address.length === 0) return <NoAddressToShow />;

  return (
    <ScrollArea className="h-96 flex items-center justify-center bg-gray-100 p-4">
      {address.map((add) => (
        <Card className="mb-4" key={add.id}>
          <CardContent className="p-4 space-y-2">
            <h4>Shipment Address</h4>
            <div className="flex items-center space-x-2 text-sm">
              <h5 className="capitalize">{add.name}</h5>
              {add.isMain && (
                <span className="bg-primary h-4 w-8 text-xs flex items-center justify-center text-white rounded-md">
                  main
                </span>
              )}
            </div>
            <div className="text-sm">{add.phone}</div>
            <div className="text-sm">
              {add.address} {add.province} {add.city} {add.zipcode}
            </div>
            <div className="flex gap-2">
              <UpdateAddress address={add} />
              {!add.isMain && <DeleteAddress address={add} />}
            </div>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
};

export default AddressPreview;

const NoAddressToShow = () => {
  return (
    <div className="h-96 border bg-gray-100 flex items-center justify-center">
      <h4>You dont have any address, Try to add one</h4>
    </div>
  );
};
