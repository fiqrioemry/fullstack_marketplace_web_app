import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-12 gap-4 p-4 border border-muted-foreground/50 rounded-md">
        <div className="col-span-4">
          <div className="p-4 space-y-4 border border-muted-foreground/50 rounded-md min-h-72">
            <div className="h-60"></div>
            <Button className="w-full">Change Photo</Button>
          </div>
        </div>
        <div className="col-span-8 space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullname">Fullname</label>
            <Input id="fullname" placeholder="ahmad fiqri oemry" />
          </div>
          <div className="space-y-2">
            <label htmlFor="fullname">Email</label>
            <Input id="fullname" placeholder="foemry@gmail.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="fullname">Phone</label>
            <Input id="fullname" placeholder="082160995044" />
          </div>
          <div className="space-y-2">
            <label htmlFor="fullname">Gender</label>
            <Input type="select" id="fullname" placeholder="male" />
          </div>
          <div className="space-y-2">
            <label htmlFor="fullname">Birthday</label>
            <Input type="date" id="fullname" placeholder="ahmad fiqri oemry" />
          </div>

          <div className="flex justify-end space-y-2">
            <Button>Update Profile</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
