import { useUserStore } from "@/store/useUserStore";
const DisplayProfile = () => {
  const { profile } = useUserStore();
  return (
    <div className="col-span-2">
      <div>
        <div className="pb-4 border-b">
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

export default DisplayProfile;
