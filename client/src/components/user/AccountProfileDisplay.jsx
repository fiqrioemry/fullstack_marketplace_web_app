import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent } from "@/components/ui/card";

const AccountProfileDisplay = () => {
  const { profile } = useUserStore();

  return (
    <Card className="col-span-2">
      <CardContent className="space-y-2 p-4">
        <div className="pb-2 border-b mb-2">
          <h3>Account Profile</h3>
        </div>
        <div className="flex items-center capitalize gap-4">
          <h5 className="min-w-48">email</h5>
          <span>{profile.email}</span>
        </div>
        <div className="flex items-center capitalize gap-4">
          <h5 className="min-w-48">fullname</h5>
          <span>{profile.fullname}</span>
        </div>
        <div className="flex items-center capitalize gap-4">
          <h5 className="min-w-48">gender</h5>
          <span>{profile.gender}</span>
        </div>
        <div className="flex items-center capitalize gap-4">
          <h5 className="min-w-48">birthday</h5>
          <span>{profile.birthday}</span>
        </div>
        <div className="flex items-center capitalize gap-4">
          <h5 className="min-w-48">phone</h5>
          <span>{profile.phone}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountProfileDisplay;
