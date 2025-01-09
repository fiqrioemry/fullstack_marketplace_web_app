import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const NewAddress = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800">
        Create New Address
      </h4>
      <ScrollArea className="h-60">
        <div className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2 px-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input id="name" placeholder="Enter your name" aria-label="Name" />
          </div>

          {/* Address Field */}
          <div className="space-y-2 px-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              placeholder="Enter your address"
              aria-label="Address"
              className="w-full h-40 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Receipient Field */}
          <div className="space-y-2 px-2">
            <label
              htmlFor="receipient"
              className="block text-sm font-medium text-gray-700"
            >
              Recipient
            </label>
            <Input
              id="receipient"
              placeholder="Enter recipient name"
              aria-label="Recipient"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2 px-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              aria-label="Phone"
            />
          </div>

          {/* Checkbox for Default Address */}
          <div className="flex items-center space-x-2 px-2">
            <Input type="checkbox" id="default-address" className="w-5 h-5" />
            <label
              htmlFor="default-address"
              className="text-sm font-medium text-gray-700"
            >
              Set as default address
            </label>
          </div>

          {/* Save Button */}
          <div className="px-2">
            <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
              Save New Address
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default NewAddress;
