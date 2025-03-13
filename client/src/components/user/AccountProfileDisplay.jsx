import { useUserStore } from "@/store/useUserStore";

const AccountProfileDisplay = () => {
  const { profile } = useUserStore();

  return (
    <div className="aspect-ratio col-span-1 md:col-span-2 rounded-lg p-4 border">
      <div className="space-y-2 p-4">
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
      </div>
    </div>
  );
};

export default AccountProfileDisplay;
